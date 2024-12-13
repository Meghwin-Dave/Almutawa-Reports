frappe.ui.form.on('Stock Entry', {
	refresh(frm) {
	    console.log(frm.doc.department)
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
		
	}
});
frappe.ui.form.on('Stock Entry', {
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




// for child table filter department and project 
frappe.ui.form.on('Stock Entry', {
	refresh(frm) {
	   frm.fields_dict['items'].grid.get_field('department').get_query = function(doc, cdt, cdn) {
            const row = locals[cdt][cdn];
            
            // Apply filter using the pre-fetched department value
            if (row.custom_department_filter) {
                return {
                    filters: { "name": row.custom_department_filter }
                };
            } else {
                return {};
            }
        };
		    
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
frappe.ui.form.on('Stock Entry Detail', {
project: function(frm, cdt, cdn) {
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
        else {frappe.model.set_value(cdt, cdn, 'custom_department_filter','');}
    }
});