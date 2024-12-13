frappe.ui.form.on('Employee', {

    onload:function(frm){
        frm.set_df_property('custom_project_no', 'read_only', 1);
            frm.refresh_field('custom_project_no');
        
    },
	department:function(frm) {
	    	
	    
	   
	    if (frm.doc.department){
	       frm.set_df_property('custom_project_no', 'read_only', 0);
            frm.refresh_field('custom_project_no');
	    }
	    else {
	        frm.set_df_property('custom_project_no', 'read_only', 1);
            frm.refresh_field('custom_project_no');
	    }
	        
	    },
	    
		// your code here
	
        refresh:function(frm){
    
	    if (frm.doc.department){
	       frm.set_df_property('custom_project_no', 'read_only', 0);
            frm.refresh_field('custom_project_no');
	    }
	    else {
	         frm.set_df_property('custom_project_no', 'read_only', 1);
            frm.refresh_field('custom_project_no');
	    }
	        
	    },

        before_save: function(frm) {
    
    
            // console.log("Data");
            let employee_name = frm.doc.employee_name;
            let employee_number = frm.doc.employee_number;
    
            
            let combined_name = `${employee_name} - ${employee_number}`;
    
    
            frm.set_value('custom_title_name', combined_name);
            frm.refresh_field('custom_title_name');
    
        },
        before_insert: function(frm) {
        
        
            // Get values from project_id and project_name fields
            let employee_name = frm.doc.employee_name;
            let employee_number = frm.doc.employee_number;
    
            // Combine them in the desired format
            let combined_name = `${employee_name} - ${employee_number}`;
    
            // Set the combined value back to the project_name field
            
            frm.set_value('custom_title_name', combined_name);
            frm.refresh_field('custom_title_name');
    
        },
    
});
	
	
