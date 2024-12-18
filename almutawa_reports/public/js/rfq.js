frappe.ui.form.on('Request for Quotation', {
    refresh(frm) {
        if (frm.doc.__islocal && frm.doc.items[0].material_request) {
            console.log("Request for Quotation");
            frappe.model.with_doc("Material Request", frm.doc.items[0].material_request, function () {
                var mr_doc = frappe.model.get_doc("Material Request", frm.doc.items[0].material_request);
                $.each(frm.doc.items, function (index, item) {

                    frappe.model.set_value(item.doctype, item.name, 'project_name', mr_doc.items[index].project);
                    frappe.model.set_value(item.doctype, item.name, 'custom_department', mr_doc.items[index].department);
                    // frappe.model.set_value(item.doctype, item.name, 'department', rfq_doc.items[0].department);
                    frm.refresh_field("items");

                });


            });

        }
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


frappe.ui.form.on('Request for Quotation', {
    refresh(frm) {
        frm.fields_dict['items'].grid.get_field('custom_department').get_query = function (doc, cdt, cdn) {
            const row = locals[cdt][cdn];

            // Apply filter using the pre-fetched department value
            if (row.custom_department_filter) {
                return {
                    filters: { "name": row.custom_department_filter }
                };
            } else {
                return {};
            }
        },

            frm.set_query('project_name', 'items', (frm, cdt, cdn) => {

                const row = locals[cdt][cdn];

                return {
                    filters: { "department": row.custom_department, "is_active": "Yes" }
                }


            });





    },
});
frappe.ui.form.on('Request for Quotation Item', {
    project_name: function (frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.project_name) {
            // Fetch the department when the project is selected
            frappe.db.get_value('Project', row.project_name, 'department', (r) => {
                if (r && r.department) {
                    frappe.model.set_value(cdt, cdn, 'custom_department_filter', r.department);
                    console.log('Fetched Department:', r.department);
                }
            });
        }
        else { frappe.model.set_value(cdt, cdn, 'custom_department_filter', ''); }
    }
});












