// frappe.listview_settings['Sales Invoice'] = {
//     filters: [
//         ["company", "=", "Industrial Instrumentation Co. Ltd."],
//     ]

// };
frappe.ui.form.on('Sales Invoice', {
	refresh(frm) {
	    
		frm.set_query('project', function() {
		    
        if(frm.doc.department){
            
		        return {
			        filters:{"department":frm.doc.department,"is_active":"Yes"}
			    }
	    }else{
	        
	        return {
		        filters:{"is_active":"Yes"}
		    }
	    }
		});
		
	},
	department(frm){		frm.set_query('project', function() {
		    
        if(frm.doc.department){
            
		        return {
			        filters:{"department":frm.doc.department,"is_active":"Yes"}
			    }
	    }else{
	        
	        return {
		        filters:{"is_active":"Yes"}
		    }
	    }
		});}
});


frappe.ui.form.on('Sales Invoice', {
    refresh: function(frm) {
        set_department_read_only(frm);
    },
    project: function(frm) {
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

	   
	   
frappe.ui.form.on('Sales Invoice', {
	refresh(frm) {
	    frm.fields_dict['items'].grid.get_field('department').get_query = function(doc, cdt, cdn) {
            const row = locals[cdt][cdn];
            console.log('department filter triggered');
            // Apply filter using the pre-fetched department value
            if (row.custom_department_filter) {
                return {
                    filters: { "name": row.custom_department_filter }
                };
            } else {
                return {};
            }
        },
	    
	    
	   frm.set_query('project', 'items', (frm, cdt, cdn) => {
	   	    
			const row = locals[cdt][cdn];
            if(row.department){
		        return {
			        filters:{"department":row.department,"is_active":"Yes"}
			    }
		    }else{
		        return {
			        filters:{"is_active":"Yes"}
			    }
		    }
		});
	},
});
frappe.ui.form.on('Sales Invoice Item', {
project: function(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.project) {
            // Fetch the department when the project is selected
            frappe.db.get_value('Project', row.project, 'department', (r) => {
                if (r && r.department) {
                    frappe.model.set_value(cdt, cdn, 'custom_department_filter', r.department);
                    console.log('Fetched Department:', r.department);
                     console.log('row Department:', row.custom_department_filter);
                }
            });
        }
        else {frappe.model.set_value(cdt, cdn, 'custom_department_filter','');}
    }
});



frappe.ui.form.on('Sales Invoice', {
    before_save: function(frm) {
        // Ensure the project field in items is set before saving
        frm.doc.items.forEach(function(item) {
            if (!item.project) {
                item.project = frm.doc.project;
                item.department=frm.department;
            }
        });
    },
    project: function(frm) {
        // Reflect changes in the Project field on the document level to all item rows
        frm.doc.items.forEach(function(item) {
            item.project = frm.doc.project;
            item.department=frm.doc.department;
        });
        frm.refresh_field('items'); // Refresh the items table to reflect changes in the UI
    }
});
frappe.ui.form.on('Sales Invoice', {
    onload: function(frm) {
        frm.set_query('custom_approver', function() {
            return {
                filters: {
                    'custom_approver': 1
                }
            };
        });
    }
});





frappe.ui.form.on('Sales Invoice', {
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
                        frm.set_value('custom_created_by_', response.message.full_name);
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
                        frm.set_value('custom_created_by_', response.message.full_name);
                    }
                }
            });
        }
    }
});
