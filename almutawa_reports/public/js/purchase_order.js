frappe.ui.form.on('Purchase Order', {
    refresh: function (frm) {
        frm.set_query("project", "items", function (doc, cdt, cdn) {
            let row = locals[cdt][cdn];
            if (row.department) {
                return {
                    filters: [
                        ['Project', 'department', '=', row.department],
                        ['Project', 'is_active', '=', 'Yes']
                    ]
                };
            } else {
                return {
                    filters: [
                        ['Project', 'is_active', '=', 'Yes']
                    ]
                };
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
});


frappe.ui.form.on('Purchase Order Item', {
    project: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.project) {
            // Fetch the department when the project is selected
            frappe.db.get_value('Project', row.project, 'department', (r) => {
                if (r && r.department) {
                    frappe.model.set_value(cdt, cdn, 'custom_department_filter', r.department);
                    console.log('Fetched Department:', r.department);
                }
            });
        }
        else { frappe.model.set_value(cdt, cdn, 'custom_department_filter', ''); }
    }
});
frappe.ui.form.on("Purchase Order",
    cur_frm.cscript.onload = function (frm) {
        cur_frm.set_query("department", "items", function (doc, cdt, cdn) {
            const row = locals[cdt][cdn];
            if (row.custom_department_filter) {
                return {
                    filters: { "name": row.custom_department_filter }
                }
            }
            else {
                return {

                }
            }
        })
    }
);










frappe.ui.form.on('Purchase Order', {
    refresh(frm) {
        if (frm.doc.__islocal && frm.doc.items.length > 0 && frm.doc.items[0].material_request) {
            frappe.model.with_doc("Material Request", frm.doc.items[0].material_request, function () {
                var mr_doc = frappe.model.get_doc("Material Request", frm.doc.items[0].material_request);

                frm.set_value('department', mr_doc.custom_department);
                // frm.set_value('project', mr_doc.custom_project);
                frm.set_value('project', mr_doc.custom_project);
                // frm.refresh_field("project");

                // Iterate through Purchase Order items and set department and project
                $.each(frm.doc.items, function (index, item) {
                    if (mr_doc.items[index]) { // Check if corresponding Material Request item exists
                        frappe.model.set_value(item.doctype, item.name, 'project', mr_doc.items[index].project);
                        frappe.model.set_value(item.doctype, item.name, 'department', mr_doc.items[index].department);
                    }
                });

                // Refresh items field after setting values
                frm.refresh_field("items");
            });
        }
    }
});











frappe.ui.form.on('Purchase Order', {
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
    } else {
        frm.set_df_property('department', 'read_only', 0);
    }
}
frappe.ui.form.on('Purchase Order', {
    refresh(frm) {
        console.log("document info", frm.doc)
        frm.set_query('project', function () {
            if (frm.doc.department) {
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




frappe.ui.form.on('Purchase Order', {
    before_save: function (frm) {
        // Ensure the project field in items is set before saving
        frm.doc.items.forEach(function (item) {
            if (!item.project) {
                item.project = frm.doc.project;
                item.department = frm.department;
            }
        });
    },
    project: function (frm) {
        // Reflect changes in the Project field on the document level to all item rows
        frm.doc.items.forEach(function (item) {
            item.project = frm.doc.project;
            item.department = frm.doc.department;
        });
        frm.refresh_field('items'); // Refresh the items table to reflect changes in the UI
    }
});
