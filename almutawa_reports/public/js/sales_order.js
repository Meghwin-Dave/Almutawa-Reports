frappe.ui.form.on('Sales Order', {
    refresh(frm) {
        frm.set_query('project', function () {
            if (frm.doc.department) {
                return {
                    filters: { "department": frm.doc.department, "is_active": "Yes" }
                }
            }
            else {
                return {
                    filters: { "is_active": "Yes" }
                }
            }
        });


        frm.set_query('project', 'items', (frm, cdt, cdn) => {
            const row = locals[cdt][cdn];
            if (row.department) {
                return {
                    filters: { "department": row.department, "is_active": "Yes" }
                }
            }
            else {
                return {
                    filters: { "is_active": "Yes" }
                }
            }

        });
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

    project(frm) {
        frm.set_query('project', function () {
            if (frm.doc.department) {
                console.log(frm.doc.department)
                return {
                    filters: { "department": frm.doc.department, "is_active": "Yes" }
                }
            } else {
                return {
                    filters: { "is_active": "Yes" }
                }
            }
        });

    }
});





frappe.ui.form.on('Sales Order', {
    refresh: function (frm) {
        set_department_read_only(frm);
    },
    project: function (frm) {
        set_department_read_only(frm);
    }
});

function set_department_read_only(frm) {
    if (frm.doc.project) {
        frm.set_df_property('department', 'read_only', 1);
    }
    else {

        frm.set_df_property('department', 'read_only', 0);
    }
}