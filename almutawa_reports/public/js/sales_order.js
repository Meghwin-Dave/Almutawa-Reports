frappe.ui.form.on('Sales Order', {
	refresh(frm) {
	    frm.set_query('project', function() {
        if(frm.doc.department){
		        return {
			        filters:{"department":frm.doc.department,"is_active":"Yes"}
			            }
	    }       
	   else{
	            return {
		            filters:{"is_active":"Yes"}
		                }
	    }
		});
		
		
	frm.set_query('project', 'items', (frm, cdt, cdn) => {
    const row = locals[cdt][cdn];
    if(row.department){
        return {
            filters:{"department":row.department,"is_active":"Yes"}
                }
    }
   else{
        return {
            filters:{"is_active":"Yes"}
                            }
                        }
 
 });
},
 
 project(frm) {
 frm.set_query('project', function() {
 if(frm.doc.department){
 console.log(frm.doc.department)
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





frappe.ui.form.on('Sales Order', {
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
  }
 else {
     
        frm.set_df_property('department', 'read_only', 0);
 }
}