// frappe.form.link_formatters['Project'] = function(value, doc) {
//     if(doc.project_name && doc.project_name !== value) {
//         return value + ': ' + doc.project_name;
//     } else {
//         return value;
//     }
// }

frappe.ui.form.on('Project', {
    refresh: function (frm) {
        console.log(frm.doc);

    }
});

frappe.ui.form.on('Project', {
    before_save: function (frm) {
        // Fetch and clean project name and project number
        let project_name = frm.doc.project_name ? frm.doc.project_name.trim() : '';
        console.log('PN', frm.doc.project_id);
        let project_id = frm.doc.project_id ? frm.doc.project_id.trim() : '';
        console.log('PN after trim ', project_id);

        // Combine the cleaned project name and project number
        let combined_project = project_id + '-' + project_name;

        // Set the combined value to a field (e.g., display_name)
        frm.set_value('display_name', combined_project);

        // Optional: log the combined value for debugging
        console.log('Combined Project Name:', combined_project);
    },

    after_insert: function (frm) {
        // Optional: Perform the same or different logic after inserting a new record
        let project_name = frm.doc.project_name ? frm.doc.project_name.trim() : '';
        let project_id = frm.doc.project_id ? frm.doc.project_id.trim() : '';

        let combined_project = project_id + '-' + project_name;
        frm.set_value('display_name', combined_project);

        console.log('After Insert Combined Project Name:', combined_project);
    },
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
});
