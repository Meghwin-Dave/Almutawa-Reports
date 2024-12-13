frappe.ui.form.on('Supplier Quotation', {
    refresh: function(frm) {
        if (frm.doc.__islocal) {
            frm.doc.items.forEach((item, index) => {
                if (item.request_for_quotation) {
                    frappe.model.with_doc("Request for Quotation", item.request_for_quotation, function() {
                        var rfq_doc = frappe.model.get_doc("Request for Quotation", item.request_for_quotation);
                        if (rfq_doc.items && rfq_doc.items.length > 0) {
                            var rfq_item = rfq_doc.items.find(rfq_item => rfq_item.item_code === item.item_code);
                            if (rfq_item) {
                                frm.doc.items[index].project = rfq_item.project_name;
                                frm.refresh_field("items");
                            }
                        }
                    });
                }
              if (item.material_request) {
    frappe.db.get_doc('Material Request', item.material_request).then(mr_doc => {
        if (mr_doc && mr_doc.items && mr_doc.items.length > 0) {
            var mr_item = mr_doc.items.find(mr_item => mr_item.item_code === item.item_code);
            if (mr_item) {
                    // Fetch the 'name' field of the Project DocType using the value in mr_doc.custom_project
                    frappe.db.get_value('Project', mr_doc.custom_project, 'name', (r) => {
                        if (r) {
                            // Set the current document's project field to the fetched name (ID) of the Project
                            frm.doc.project = r.name;
                
                            // Optional: Log the fetched name for debugging
                            console.log('Fetched Project name (ID):', r.name);
                        }
        });

    // Set other fields directly from mr_doc
    frm.doc.department = mr_doc.custom_department;

    // Optional: Log the current document values for debugging
    console.log('Current doc project:', frm.doc.project);
    console.log('MR project reference:', mr_doc.custom_project);
}

        }
    }).catch(err => {
        console.error('Failed to fetch Material Request:', err);
    });
}

            });
        }
    },
});





frappe.ui.form.on('Supplier Quotation', {
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
frappe.ui.form.on('Supplier Quotation Item', {
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


	frappe.ui.form.on('Supplier Quotation', {
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
frappe.ui.form.on('Supplier Quotation', {
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


