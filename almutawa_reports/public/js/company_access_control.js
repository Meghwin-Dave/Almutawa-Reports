frappe.ui.form.on('Company Access Control', {
    onload: function(frm) {
        frappe.call({
            method: 'frappe.client.get_list',
            args: {
                doctype: 'Company Users Control',
                filters: {
                    user: frappe.session.user
                },
                fields: [
                    'industrial_instrumentation_co_ltd', 
                    'mansha_trading_company', 
                    
                    'abdullah_h_almutawa_sons_co_for_contracting_cjsc', 
                    'medical_vision_co', 
                    
                    'vision_and_innovation_co', 
                    'exceer_al_shamel_for_drug_co', 
                    'advanced_measuring_industrial'
                ]
            },
            callback: function(response) {
                let companies = [];

                response.message.forEach((company_control) => {
                    if (company_control.industrial_instrumentation_co_ltd) companies.push("Industrial Instrumentation Co. Ltd.");
                    if (company_control.mansha_trading_company) companies.push("Mansha Trading Company");
                    if (company_control.branch_abdullah_h_almutawa_sons_co_for_contracting) companies.push("Branch Abdullah H. Al-Mutawa Sons Co. for Contracting");
                    if (company_control.abdullah_h_almutawa_sons_co_for_contracting_cjsc) companies.push("Abdullah H. Al-Mutawa Sons Co. for Contracting (CJSC)");
                    if (company_control.medical_vision_co) companies.push("Medical Vision Co.");
                    if (company_control.vision_and_innovation_co_x) companies.push("Vision and Innovation Co. X");
                    if (company_control.vision_and_innovation_co) companies.push("Vision and Innovation Co.");
                    if (company_control.exceer_al_shamel_for_drug_co) companies.push("Exceer Al Shamel for Drug Co.");
                    if (company_control.advanced_measuring_industrial) companies.push("Advanced Measuring Industrial");
                });

                frm.set_df_property('com', 'options', companies.join('\n'));
            }
        });
    }
});





frappe.ui.form.on('Company Access Control', {
    after_save: function(frm) {
        // Get the selected value from the 'com' field
        const selected_company = frm.doc.com;

        // Check if a company is selected
        if (selected_company) {
            // Set the user default for the company
            frappe.defaults.set_user_default_local("company", selected_company);
            frappe.show_alert({message: __("Default company set successfully."), indicator: 'green'});
        }
    }
});

