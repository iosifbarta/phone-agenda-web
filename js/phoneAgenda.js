window.PhoneAgenda = {

    API_URL: 'http://localhost:8081/contacts',
    createContact: function () {

        let firstNameValue = $('#firstName-field').val();
        let secondNameValue = $('#secondName-field').val();
        let phoneNumberValue = $('#phoneNumber-field').val();
        let emailValue = $('#email-field').val();

        let requestBody = {
            firstName: firstNameValue,
            secondName: secondNameValue,
            phoneNumber: phoneNumberValue,
            email: emailValue
        };

        $.ajax({
            url: PhoneAgenda.API_URL,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function () {
        PhoneAgenda.displayContacts();
        });
    },

    getContacts: function(){
      $.ajax({
          url: PhoneAgenda.API_URL
      }).done(function (response) {
          PhoneAgenda.displayContacts(JSON.parse(response));
      });
    },

    displayContacts: function(contacts){

        let rowsHtml = '';

        contacts.forEach(contact => rowsHtml += PhoneAgenda.getContactRowHtml(contact));

        $('#phone-agenda tbody').html(rowsHtml);
    },

    getContactRowHtml: function(contact){
        return `
         <tr>
            <td>${contact.firstName}</td>
            <td>${contact.secondName}</td>
            <td>${contact.phoneNumber}</td>
            <td>${contact.email}</td>
            
            <td>
                <input type="submit" value="Edit" data-id=${contact.id}>
            </td>
            <td>
                <a href="#" class="delete-contact" data-id=${contact.id}>
                    <i class="far fa-trash-alt"></i>
                </a>
            </td>
        </tr>
         `
    },

    bindEvents: function () {
        $('#create-contact-form').submit(function (event) {
            event.preventDefault();
            PhoneAgenda.createContact();
        });
    }
};
PhoneAgenda.getContacts();
PhoneAgenda.bindEvents();