frappe.ui.form.on('Account', {
    onload: function(frm) {
        // Set "Created By" field with the full name when the form is loaded, but only for new documents
        if (frm.is_new() && !frm.doc.custom_created_by) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'User',
                    filters: { 'name': frappe.session.user },
                    fieldname: 'full_name'
                },
                callback: function(response) {
                    if (response && response.message) {
                        frm.set_value('custom_created_by', response.message.full_name);
                    }
                }
            });
        }
    },
    before_save: function(frm) {
        // Set the "Created By" field with the full name only when the document is new
        if (frm.is_new() && !frm.doc.custom_created_by) {
            frappe.call({
                method: 'frappe.client.get_value',
                args: {
                    doctype: 'User',
                    filters: { 'name': frappe.session.user },
                    fieldname: 'full_name'
                },
                callback: function(response) {
                    if (response && response.message) {
                        frm.set_value('custom_created_by', response.message.full_name);
                    }
                }
            });
        }
    }
});









frappe.treeview_settings["Account"] = {
    onload: function (treeview) {
        frappe.after_ajax(() => {
            // Wait for the tree to initialize
            setTimeout(() => {
                if (treeview && typeof treeview.expand_all === "function") {
                    treeview.expand_all(); // Expand all nodes
                }
            }, 500); // Adjust timeout as needed for tree initialization
        });
    },
};

