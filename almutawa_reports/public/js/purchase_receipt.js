frappe.ui.form.on('Purchase Receipt', {
	refresh(frm) {
	   // console.log(frm.doc.department)
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
	
	project(frm){
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








frappe.ui.form.on('Purchase Receipt', {
	refresh(frm) {
    frm.set_query('project', 'items', (frm, cdt, cdn) => {
	   	    
			const row = locals[cdt][cdn];
			console.log('project filter triggered');
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
frappe.ui.form.on('Purchase Receipt Item', {
project: function(frm, cdt, cdn) {
        const row = locals[cdt][cdn];
        if (row.project) {
            // Fetch the department when the project is selected
            frappe.db.get_value('Project', row.project, 'department', (r) => {
                if (r && r.department) {
                    frappe.model.set_value(cdt, cdn, 'custom_department_filter', r.department);
                    console.log('Fetched Department:', row.custom_department_filter);
                }
            });
        }
        else {frappe.model.set_value(cdt, cdn, 'custom_department_filter','');
            
             console.log('Fetched DepartmentEmpty',);
            
        }
    }
});


	
	frappe.ui.form.on('Purchase Receipt', {
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



frappe.ui.form.on("Purchase Receipt", 
  cur_frm.cscript.onload = function(frm) {
	cur_frm.set_query("department", "items", function(doc,cdt,cdn) {
	    const row = locals[cdt][cdn];
	    if(row.custom_department_filter){
		return {
			filters: {"name":row.custom_department_filter }
		}
	    }
	    else 
	    {
	        return {
	            
	        }
	    }
	})}
	);
















frappe.ui.form.on('Purchase Receipt', {
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
