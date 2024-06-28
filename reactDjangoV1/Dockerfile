FROM python:3.9-slim-buster

WORKDIR /reactDjangoApp
COPY . .

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    curl \
    gnupg \
    unzip \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Install Chrome
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && dpkg -i google-chrome-stable_current_amd64.deb || apt-get -fy install \
    && rm google-chrome-stable_current_amd64.deb

# Install ChromeDriver
RUN CHROMEDRIVER_VERSION=$(curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE) \
    && wget -N https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip \
    && unzip chromedriver_linux64.zip \
    && rm chromedriver_linux64.zip \
    && mv chromedriver /usr/local/bin/

# Install Python dependencies
RUN pip install -r requirements.txt

EXPOSE 8000
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
