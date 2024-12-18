app_name = "almutawa_reports"
app_title = "Almutawa Reports"
app_publisher = "Accurate Systems"
app_description = "Almutawa Reports"
app_email = "info@accuratesystems.com.sa"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "almutawa_reports",
# 		"logo": "/assets/almutawa_reports/logo.png",
# 		"title": "Almutawa Reports",
# 		"route": "/almutawa_reports",
# 		"has_permission": "almutawa_reports.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/almutawa_reports/css/almutawa_reports.css"
# app_include_js = "/assets/almutawa_reports/js/almutawa_reports.js"
app_include_js = "/assets/almutawa_reports/js/treeview_custom.js"

# include js, css files in header of web template
# web_include_css = "/assets/almutawa_reports/css/almutawa_reports.css"
# web_include_js = "/assets/almutawa_reports/js/almutawa_reports.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "almutawa_reports/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}
tree_js = {"Account": "public/js/coa_expand_all.js"}


# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}
doctype_js = {
    "Journal Entry": "public/js/journal_entry.js",
    "Budget" : "public/js/budget.js",
    "Account" : "public/js/account.js",
    "Sales Invoice" : "public/js/sales_invoice.js",
    "Payment Entry" : "public/js/payment_entry.js",
    "Item" : "public/js/item.js",
    "Company Access Control" : "public/js/company_access_control.js",
    "Project" : "public/js/project.js",
    "Delivery Note" : "public/js/delivery_note.js",
    "Supplier" : "public/js/supplier.js",
    "Sales Order" : "public/js/sales_order.js",
    "Material Request" : "public/js/material_request.js",
    "Supplier Quotation" : "public/js/supplier_quotation.js",
    "Purchase Order": "public/js/purchase_order.js",
    "Purchase Receipt" : "public/js/purchase_receipt.js",
    "Purchase Invoice": "public/js/purchase_invoice.js",
    "Stock Entry": "public/js/stock_entry.js",
    "Request for Quotation" : "public/js/rfq.js",
    "Employee" : "public/js/employee.js",
    "Customer" : "public/js/customer.js"
}




# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "almutawa_reports/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "almutawa_reports.utils.jinja_methods",
# 	"filters": "almutawa_reports.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "almutawa_reports.install.before_install"
# after_install = "almutawa_reports.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "almutawa_reports.uninstall.before_uninstall"
# after_uninstall = "almutawa_reports.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "almutawa_reports.utils.before_app_install"
# after_app_install = "almutawa_reports.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "almutawa_reports.utils.before_app_uninstall"
# after_app_uninstall = "almutawa_reports.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "almutawa_reports.notifications.get_notification_config"

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

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"almutawa_reports.tasks.all"
# 	],
# 	"daily": [
# 		"almutawa_reports.tasks.daily"
# 	],
# 	"hourly": [
# 		"almutawa_reports.tasks.hourly"
# 	],
# 	"weekly": [
# 		"almutawa_reports.tasks.weekly"
# 	],
# 	"monthly": [
# 		"almutawa_reports.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "almutawa_reports.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "almutawa_reports.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "almutawa_reports.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["almutawa_reports.utils.before_request"]
# after_request = ["almutawa_reports.utils.after_request"]

# Job Events
# ----------
# before_job = ["almutawa_reports.utils.before_job"]
# after_job = ["almutawa_reports.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"almutawa_reports.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

