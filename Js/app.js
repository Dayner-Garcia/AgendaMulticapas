const apiUrl = "http://www.raydelto.org/agenda.php";

const fetchContacts = async () => {
    try {
        const response = await fetch(apiUrl);
        return await response.json();
    } catch (error) {
        console.error("Error fetching contacts: ", error);
    }
};

const addContact = async (contact) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(contact),
        });
        return await response.json();
    } catch (error) {
        console.error("Error adding contact: ", error);
        throw new Error("Failed to add contact");
    }
};

const getContactList = async () => {
    const contacts = await fetchContacts();
    return contacts || [];
};

const createContact = async (contact) => {
    const result = await addContact(contact);
    return result;
};

document.addEventListener("DOMContentLoaded", async () => {
    const contactListElement = document.getElementById("contact-list");
    const contactForm = document.getElementById("contact-form");
    const messageElement = document.getElementById("message");

    const displayContacts = (contacts) => {
        contactListElement.innerHTML = '';
        contacts.forEach(contact => {
            const contactItem = document.createElement("div");
            contactItem.innerHTML = `${contact.nombre} ${contact.apellido} - ${contact.telefono}`;
            contactListElement.appendChild(contactItem);
        });
    };

    const loadContacts = async () => {
        const contacts = await getContactList();
        displayContacts(contacts);
    };

    const showMessage = (message, type) => {
        messageElement.textContent = message;
        messageElement.className = `message ${type}`;
        messageElement.style.display = 'block';

        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    };

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;

        const newContact = { nombre, apellido, telefono };

        try {
            await createContact(newContact);

            showMessage("Contacto agregado correctamente", "success");

            contactForm.reset();

            loadContacts();
        } catch (error) {
            showMessage("Error al agregar el contacto", "error");
        }
    });

    loadContacts();
});
