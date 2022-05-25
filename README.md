# TMS (Tampere Multisite) WordPress Plugin News importer

This WordPress plugin fetches and imports news from tampere.fi. It creates a new Cron instance on init and calls it's hooks for scheduling news import twice a day. News are imported first to the main site of the network by WP Oopi plugin. After that news are imported or updated on their defined target sites.

## Prerequisites/requirements

* [OOPI WordPress plugin](https://github.com/devgeniem/wp-oopi)

## Manually fetch and import news


With the WP-CLI:

```
wp news import
```