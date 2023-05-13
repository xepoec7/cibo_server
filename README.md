# Cibo_Server

This is a Django / React Project created for a small restaurant business.

The steps in this document assume you have access to private server to deploy and run apps.

## Local development

1. Clone this repo:

    `git clone https://github.com/xepoec7/cibo_server.git`

2. Install dependencies:

    `pip install -r requirements.txt`

3. Create development database:

    `python manage.py migrate`

4. If everything is alright, you should be able to start Gunicorn:

    `gunicorn -c /config/prod.py`

5. Restart Nginx:

    `sudo systemctl restart nginx`

6. Open broweser and go to address you have configurated in your nginx config file




