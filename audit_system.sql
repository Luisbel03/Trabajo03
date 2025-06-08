-- Crear la tabla de registro de actividad
CREATE TABLE IF NOT EXISTS actividad_log (
    id SERIAL PRIMARY KEY,
    tabla_nombre VARCHAR(100) NOT NULL,
    tipo_operacion VARCHAR(20) NOT NULL,
    id_registro INTEGER NOT NULL,
    datos_antiguos JSONB,
    datos_nuevos JSONB,
    usuario_id INTEGER,
    fecha_operacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_actividad_log_tabla ON actividad_log(tabla_nombre);
CREATE INDEX IF NOT EXISTS idx_actividad_log_tipo_op ON actividad_log(tipo_operacion);
CREATE INDEX IF NOT EXISTS idx_actividad_log_fecha ON actividad_log(fecha_operacion);

-- Función para registrar cambios en los comentarios del foro
CREATE OR REPLACE FUNCTION registrar_cambios_foro() RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO actividad_log (
            tabla_nombre,
            tipo_operacion,
            id_registro,
            datos_nuevos,
            usuario_id
        ) VALUES (
            'core_forumreply',
            'INSERT',
            NEW.id,
            json_build_object(
                'content', NEW.content,
                'topic_id', NEW.topic_id,
                'author_id', NEW.author_id,
                'is_solution', NEW.is_solution,
                'created_at', NEW.created_at
            ),
            NEW.author_id
        );
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO actividad_log (
            tabla_nombre,
            tipo_operacion,
            id_registro,
            datos_antiguos,
            datos_nuevos,
            usuario_id
        ) VALUES (
            'core_forumreply',
            'UPDATE',
            NEW.id,
            json_build_object(
                'content', OLD.content,
                'is_solution', OLD.is_solution,
                'updated_at', OLD.updated_at
            ),
            json_build_object(
                'content', NEW.content,
                'is_solution', NEW.is_solution,
                'updated_at', NEW.updated_at
            ),
            NEW.author_id
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO actividad_log (
            tabla_nombre,
            tipo_operacion,
            id_registro,
            datos_antiguos,
            usuario_id
        ) VALUES (
            'core_forumreply',
            'DELETE',
            OLD.id,
            json_build_object(
                'content', OLD.content,
                'topic_id', OLD.topic_id,
                'author_id', OLD.author_id,
                'is_solution', OLD.is_solution,
                'created_at', OLD.created_at,
                'updated_at', OLD.updated_at
            ),
            OLD.author_id
        );
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Crear los triggers para la tabla de comentarios
DROP TRIGGER IF EXISTS trigger_cambios_foro_insert ON core_forumreply;
DROP TRIGGER IF EXISTS trigger_cambios_foro_update ON core_forumreply;
DROP TRIGGER IF EXISTS trigger_cambios_foro_delete ON core_forumreply;

CREATE TRIGGER trigger_cambios_foro_insert
    AFTER INSERT ON core_forumreply
    FOR EACH ROW
    EXECUTE FUNCTION registrar_cambios_foro();

CREATE TRIGGER trigger_cambios_foro_update
    AFTER UPDATE ON core_forumreply
    FOR EACH ROW
    EXECUTE FUNCTION registrar_cambios_foro();

CREATE TRIGGER trigger_cambios_foro_delete
    BEFORE DELETE ON core_forumreply
    FOR EACH ROW
    EXECUTE FUNCTION registrar_cambios_foro();

-- Función para consultar el registro de actividad
CREATE OR REPLACE FUNCTION consultar_actividad_foro(
    p_fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    p_fecha_fin TIMESTAMP WITH TIME ZONE DEFAULT NULL
) RETURNS TABLE (
    id INTEGER,
    operacion VARCHAR(20),
    fecha TIMESTAMP WITH TIME ZONE,
    usuario_id INTEGER,
    detalles JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.tipo_operacion as operacion,
        a.fecha_operacion as fecha,
        a.usuario_id,
        CASE
            WHEN a.tipo_operacion = 'DELETE' THEN a.datos_antiguos
            ELSE COALESCE(a.datos_nuevos, a.datos_antiguos)
        END as detalles
    FROM actividad_log a
    WHERE a.tabla_nombre = 'core_forumreply'
        AND (p_fecha_inicio IS NULL OR a.fecha_operacion >= p_fecha_inicio)
        AND (p_fecha_fin IS NULL OR a.fecha_operacion <= p_fecha_fin)
    ORDER BY a.fecha_operacion DESC;
END;
$$ LANGUAGE plpgsql; 