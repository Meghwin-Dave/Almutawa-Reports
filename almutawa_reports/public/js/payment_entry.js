frappe.ui.form.on('Payment Entry', {
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


frappe.ui.form.on('Payment Entry', {
    refresh: function(frm) {
        set_department_read_only(frm);
    },
    project: function(frm) {
        set_department_read_only(frm);
    }
});

function set_department_read_only(frm) {
    if (frm.doc.project) {
        console.log(frm.doc.project);
        frm.set_df_property('department', 'read_only', 1);
    } else {
        frm.set_df_property('department', 'read_only', 0);
    }
}






frappe.ui.form.on('Payment Entry', {
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















frappe.ui.form.on('Payment Entry Deduction', {
    custom_company: function(frm, cdt, cdn) {
        // When custom_company changes in each row, fetch and set the cost center
        let row = locals[cdt][cdn];
        if (row.custom_company) {
            frappe.db.get_value("Company", row.custom_company, "cost_center", (r) => {
                if (r && r.cost_center) {
                    frappe.model.set_value(cdt, cdn, "cost_center", r.cost_center);
                } else {
                    frappe.msgprint(__("No default cost center set for {0}", [row.custom_company]));
                }
            });
        }
    },
    // Optional: Set cost center when a new row is added, if custom_company is already set
    deductions_add: function(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        if (row.custom_company) {
            frappe.db.get_value("Company", row.custom_company, "cost_center", (r) => {
                if (r && r.cost_center) {
                    frappe.model.set_value(cdt, cdn, "cost_center", r.cost_center);
                }
            });
        }
    }
});
