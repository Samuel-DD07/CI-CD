# --- Stage 1: Build Dependencies ---
FROM python:3.12-slim AS builder

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies via pip
COPY pyproject.toml .
# We use a temporary venv to copy it to the next stage
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir .

# --- Stage 2: Runtime ---
FROM python:3.12-slim

WORKDIR /app

# Non-root user setup
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser

# Copy venv from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install runtime system dependencies (libpq for postgres)
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copy application code
COPY . .

# Change ownership to non-root user
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
