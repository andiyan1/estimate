# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "estimate"
app_title = "Estimate"
app_publisher = "Test Products"
app_description = "Estimate Tools"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "tara.antonius@gmail.com"
app_version = "0.0.1"
app_license = "MIT"

fixtures = ['Custom Field',
'Property Setter',
'Custom Script',
'Print Format']

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "/assets/estimate/css/estimate.css"
app_include_js = "/assets/estimate/js/estimate.js"

# include js, css files in header of web template
web_include_css = "/assets/estimate/css/estimate.css"
web_include_js = "/assets/estimate/js/estimate.js"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "estimate.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "estimate.install.before_install"
# after_install = "estimate.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "estimate.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"estimate.tasks.all"
# 	],
# 	"daily": [
# 		"estimate.tasks.daily"
# 	],
# 	"hourly": [
# 		"estimate.tasks.hourly"
# 	],
# 	"weekly": [
# 		"estimate.tasks.weekly"
# 	]
# 	"monthly": [
# 		"estimate.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "estimate.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "estimate.event.get_events"
# }
