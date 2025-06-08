import os
import psycopg2
from django.conf import settings

def apply_audit_system():
    # Obtener las credenciales de la base de datos desde Django settings
    db_settings = settings.DATABASES['default']
    
    # Conectar a la base de datos
    conn = psycopg2.connect(
        dbname=db_settings['NAME'],
        user=db_settings['USER'],
        password=db_settings['PASSWORD'],
        host=db_settings['HOST'],
        port=db_settings['PORT']
    )
    
    try:
        # Crear un cursor
        cur = conn.cursor()
        
        # Leer y ejecutar el archivo SQL
        with open('audit_system.sql', 'r') as file:
            sql = file.read()
            cur.execute(sql)
        
        # Confirmar los cambios
        conn.commit()
        print("Sistema de auditoría instalado correctamente.")
        
    except Exception as e:
        print(f"Error al instalar el sistema de auditoría: {str(e)}")
        conn.rollback()
    finally:
        # Cerrar la conexión
        cur.close()
        conn.close()

if __name__ == '__main__':
    import django
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    django.setup()
    apply_audit_system() 