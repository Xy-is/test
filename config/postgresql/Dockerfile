FROM postgres:17.0

# Определяем переменные окружения для конфигурации базы данных
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
ENV POSTGRES_DB=${POSTGRES_DB}

# Открываем порт для PostgreSQL (стандартный порт 5432)
EXPOSE ${POSTGRES_PORT}

# Команда для запуска PostgreSQL-сервера
CMD ["postgres"]
