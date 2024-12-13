frappe.ui.form.on('Material Request', {
    refresh(frm) {
	   frm.fields_dict['items'].grid.get_field('department').get_query = function(doc, cdt, cdn) {
            const row = locals[cdt][cdn];
            
            // Apply filter using the pre-fetched department value
            if (row.department_filter) {
                console.log('inside department',row.department_filter);
                return {
                    filters: { "name": row.department_filter }
                };
            } else {
                return {};
            }
        };
        frm.set_query('project', 'items', (frm, cdt, cdn) => {
            const row = locals[cdt][cdn];
            
            if (row.department) {
                return {
                    filters: { "department": row.department, "is_active": "Yes" }
                };
            } else {
                return {
                    filters: { "is_active": "Yes" }
                };
            }
        
    
});}});
frappe.ui.form.on('Material Request Item', {
project: function(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        console.log('project field trigerred',row.project);
        if (row.project) {
            // Fetch the department when the project is selected
            frappe.db.get_value('Project', row.project, 'department', (r) => {
                if (r && r.department) {
                    frappe.model.set_value(cdt, cdn, 'department_filter', r.department);
                    console.log('Fetched Department:', r.department);
                }
            });
        }
        else {frappe.model.set_value(cdt, cdn, 'department_filter','');}
    }});








frappe.ui.form.on('Material Request', {
    refresh: function(frm) {
        set_department_read_only(frm);
    },
    custom_project: function(frm) {
        set_department_read_only(frm);
    }
});

function set_department_read_only(frm) {
    if (frm.doc.custom_project) {
        frm.set_df_property('custom_department', 'read_only', 1);
    } else {
        frm.set_df_property('custom_department', 'read_only', 0);
    }
}

frappe.ui.form.on('Material Request', {
    before_save: function(frm) {
        // Ensure the project field in items is set before saving
        frm.doc.items.forEach(function(item) {
            if (!item.project) {
                item.project = frm.doc.custom_project;
                item.department=frm.custom_department;
            }
        });
    },
    custom_project: function(frm) {
        // Reflect changes in the Project field on the document level to all item rows
        frm.doc.items.forEach(function(item) {
            item.project = frm.doc.custom_project;
            item.department=frm.doc.custom_department;
        });
        frm.refresh_field('items'); // Refresh the items table to reflect changes in the UI
    }
});
frappe.ui.form.on('Material Request', {
	refresh(frm) {
	    
		frm.set_query('custom_project', function() {
		    
        if(frm.doc.custom_department){
            
		        return {
			        filters:{"department":frm.doc.custom_department,"is_active":"Yes"}
			    }
	    }else{
	        
	        return {
		        filters:{"is_active":"Yes"}
		    }
	    }
		});
		
	},
	custom_department(frm){		frm.set_query('custom_project', function() {
		    
        if(frm.doc.custom_department){
            
		        return {
			        filters:{"department":frm.doc.custom_department,"is_active":"Yes"}
			    }
	    }else{
	        
	        return {
		        filters:{"is_active":"Yes"}
		    }
	    }
		});}
});
























