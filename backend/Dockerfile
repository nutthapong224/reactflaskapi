FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app
COPY app ./app

# Non-root user for security
RUN useradd -m flaskuser
USER flaskuser

# Gunicorn command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app.main:app"]
