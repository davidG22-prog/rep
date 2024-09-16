import '@capacitor/core';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Camera, CameraResultType , CameraSource } from '@capacitor/camera';
import { Share } from '@capacitor/share';
import { Toast } from '@capacitor/toast'; 
import { Dialog } from '@capacitor/dialog';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'; 
import { PrivacyScreen } from '@capacitor-community/privacy-screen';
import html2canvas from 'html2canvas'; 
 
let db;// Declare db in the outer scope to access it in other functions
let imagesArray = [];

const DATABASE_NAME = 'repLogDB';
const DATABASE_VERSION = 2;

const createDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onerror = (event) => {
      console.error('Error opening database:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      console.log('Database opened successfully');
      const db = event.target.result;
      resolve(db); 
    };

    request.onupgradeneeded = (event) => {
      console.log('Database upgrade needed');
      const db = event.target.result;

      // Create stores (tables)
      //table to store school info  
      if (!db.objectStoreNames.contains('schools')) {
        const objectStore = db.createObjectStore('schools', { keyPath: 'school_id' });
        objectStore.createIndex('id', 'school_id', { unique: true });
      }
      //table to store invoices
      if (!db.objectStoreNames.contains('invoice')) {
        const invoiceStore = db.createObjectStore('invoice', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store company price list
      if (!db.objectStoreNames.contains('priceList')) {
        db.createObjectStore('priceList', { keyPath: 'id', autoIncrement: true });
      }
      //table to store custom price list
      if (!db.objectStoreNames.contains('custom_price')) {
        const customPriceStore = db.createObjectStore('custom_price', { keyPath: 'id' });
        // Create the 'ref' index correctly:
        customPriceStore.createIndex('ref', 'ref', { unique: true }); 
      }
      //table to store requisition
      if (!db.objectStoreNames.contains('requisition')) {
        const requisitionStore = db.createObjectStore('requisition', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        requisitionStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store verified requisition i.e waybill
      if (!db.objectStoreNames.contains('waybill')) {
        const waybillStore = db.createObjectStore('waybill', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        waybillStore.createIndex('date', 'date', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments submited
      if (!db.objectStoreNames.contains('payment')) {
        const paymentStore = db.createObjectStore('payment', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        paymentStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments verified i.e sales
      if (!db.objectStoreNames.contains('sales')) {
        const salesStore = db.createObjectStore('sales', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        salesStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store custom price list
      if (!db.objectStoreNames.contains('request_images')) {
        const requestImageStore = db.createObjectStore('request_images', { keyPath: 'id' });
        // Create the 'ref' index correctly:
        requestImageStore.createIndex('ref', 'ref', { unique: true }); 
      }
    };
  });
};
 
// Function to open the database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION); // Replace with your database name and version

    request.onupgradeneeded = (event) => {
      console.log('Database upgrade needed');
      const db = event.target.result;

      // Create stores (tables)
      //table to store school info  
      if (!db.objectStoreNames.contains('schools')) {
        const objectStore = db.createObjectStore('schools', { keyPath: 'school_id' });
        objectStore.createIndex('id', 'school_id', { unique: true });
      }
      //table to store invoices
      if (!db.objectStoreNames.contains('invoice')) {
        const invoiceStore = db.createObjectStore('invoice', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store company price list
      if (!db.objectStoreNames.contains('priceList')) {
        db.createObjectStore('priceList', { keyPath: 'id', autoIncrement: true });
      }
      //table to store custom price list
      if (!db.objectStoreNames.contains('custom_price')) {
        const customPriceStore = db.createObjectStore('custom_price', { keyPath: 'id' });
        // Create the 'ref' index correctly:
        customPriceStore.createIndex('ref', 'ref', { unique: true }); 
      }
      //table to store requisition
      if (!db.objectStoreNames.contains('requisition')) {
        const requisitionStore = db.createObjectStore('requisition', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        requisitionStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store verified requisition i.e waybill
      if (!db.objectStoreNames.contains('waybill')) {
        const waybillStore = db.createObjectStore('waybill', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        waybillStore.createIndex('date', 'date', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments submited
      if (!db.objectStoreNames.contains('payment')) {
        const paymentStore = db.createObjectStore('payment', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        paymentStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments verified i.e sales
      if (!db.objectStoreNames.contains('sales')) {
        const salesStore = db.createObjectStore('sales', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        salesStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store request images
      if (!db.objectStoreNames.contains('request_images')) {
        const requestImageStore = db.createObjectStore('request_images', { keyPath: 'id' });
        // Create the 'ref' index correctly:
        requestImageStore.createIndex('ref', 'ref', { unique: true }); 
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log('Database opened successfully');
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('Error opening database:', event.target.error);
      reject(event.target.error);
    };
  });
};




/*******************  invoice code       *************** */

const getInvoiceList = async () => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['invoice'], 'readonly');
      const store = transaction.objectStore('invoice');
      const request = store.getAll(); 

      request.onsuccess = (event) => {
        const invoices = event.target.result;
        resolve(invoices);
      };

      request.onerror = (event) => {
        console.error('Error fetching invoices:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in getInvoiceList:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

// Function to create a new invoice
const createInvoice = async (ref, info) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 
    const { ref, school, date, address, season, status, school_ref} = info;
    return new Promise((resolve, reject) => {
      // Create a transaction for the 'invoice' store with readwrite access
      const transaction = db.transaction(['invoice'], 'readwrite');
      const store = transaction.objectStore('invoice');
      
       // Create the invoice object
      const invoiceData = {
        id: ref,
        ref,
        school,
        address,
        date,
        school_ref,
        season,
        status,
        details: JSON.stringify(info),
      };

      // Add the invoice data to the store
      const request = store.add(invoiceData);

      request.onsuccess = () => {
        console.log('Invoice added successfully:', request.result);
        alert_Toast(`Invoice ${ref} created successfully`);
        resolve(request.result); // Resolve with the generated ID if needed
      };

      request.onerror = (event) => {
        console.error('Error adding invoice:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in createInvoice:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

// get invoice list
const getAnInvoice = async(ref) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['invoice'], 'readonly');
      const store = transaction.objectStore('invoice');

      // Assuming 'ref' is stored in the 'ref' property of invoice objects
      const request = store.index('ref').get(ref); 

      request.onsuccess = (event) => {
        const invoice = event.target.result;
        if (invoice) {
          resolve(invoice.details); 
        } else {
          console.error('Invoice not found.');
          resolve(null); // Or reject with an error
        }
      };

      request.onerror = (event) => {
        console.error(`Error fetching invoice ${ref}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in getAnInvoice:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};


// Update invoice
const updateInvoice = async(ref, details, stats) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase();
    return new Promise((resolve, reject) => {
      
      const transaction = db.transaction(['invoice'], 'readwrite');
      const store = transaction.objectStore('invoice');

      // Assuming 'ref' is used to find the invoice to update
      const request = store.index('ref').get(ref); // Get the invoice by 'ref'

      request.onsuccess = (event) => {
        const invoiceToUpdate = event.target.result;

        if (invoiceToUpdate) {
          // Update the 'details' and 'status' property
          invoiceToUpdate.details = details;
          invoiceToUpdate.status = stats ? stats : 'saved'; 

          // Put the updated object back into the store
          const updateInvoiceDetails = store.put(invoiceToUpdate);

          updateInvoiceDetails.onsuccess = () => {
            console.log('Invoice updated successfully');
            resolve(); // Resolve the promise on successful update
          };

          updateInvoiceDetails.onerror = (event) => {
            console.error('Error updating invoice:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.error('Invoice not found for update.');
          reject(new Error('Invoice not found for update.'));
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching invoice for update:', event.target.error);
        reject(event.target.error);
      };
    });
    } catch (error) {
      console.error('Error in updateInvoice:', error);
      throw error; // Re-throw to handle the error at a higher level
    }
};

// Delete invoice database code
const deleteInvoice = async(ref) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['invoice'], 'readwrite');
      const store = transaction.objectStore('invoice');

      // Assuming 'ref' is used to find the invoice to delete
      const request = store.index('ref').openCursor(IDBKeyRange.only(ref));

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // Delete the invoice from the store
          const deleteRequest = cursor.delete(); 

          deleteRequest.onsuccess = () => {
            console.log('Invoice deleted successfully');
            resolve(); // Resolve the promise on successful deletion
          };

          deleteRequest.onerror = (event) => {
            console.error('Error deleting invoice:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.log('Invoice not found for deletion.');
          resolve(); // Resolve even if not found (no error thrown)
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching invoice for deletion:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in deleteInvoice:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

const delitemfrmInvoice = async (indexToRemove) => {
  const { value } = await Dialog.confirm({
    title: 'Remove book',
    message: `Are you sure you want to remove this book?`,
    okButtonTitle: 'remove',
  });

    if(value == 1){
           // If the book is found in the array
            if (indexToRemove !== -1) {
            // Remove the book from the array and store the removed book object
            invoiceItemsAry.splice(indexToRemove, 1);
                //code to save to device db
                //update invoice collections
                requisitionObject.collections = invoiceItemsAry;

                await updateInvoice(in_ref, JSON.stringify(requisitionObject), 'draft');
                
                await alert_Toast('book removed from list');
            //reload cart
            editInvoice(in_ref);
            } else {
            // Log a message indicating the book was not found in the cart
            console.log(`Book not found in invoice: ${bookToRemove.title}`);
            } 
    }
 
};

//delete invoice front end function
const delInvoice = async (ref) => {
  const { value } = await Dialog.confirm({
    title: 'Delete Invoice',
    message: `you are about to delete invoice ${ref.toUpperCase()}`,
    okButtonTitle: 'yes delete',
  });

    if(value == 1){
      await deleteInvoice(ref);
      await alert_Toast('invoice deleted'); 
      //reload cart
      invoiceList();  
    }  
};

// Expose functions to the global scope
window.createInvoice = createInvoice;
window.getInvoiceList = getInvoiceList;
window.getAnInvoice = getAnInvoice;
window.updateInvoice = updateInvoice;
window.deleteInvoice = deleteInvoice;



/*******************  requisition code       *************** */

// get request list 
const getRequestList = async () => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['requisition'], 'readonly');
      const store = transaction.objectStore('requisition');
      const request = store.getAll(); 

      request.onsuccess = (event) => {
        const requi = event.target.result;
        resolve(requi);
      };

      request.onerror = (event) => {
        console.error('Error fetching invoices:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in getInvoiceList:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

// Function to create a new requisition
const createRequest = async (ref, info) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 
    const { ref, date, season, status} = info;
    return new Promise((resolve, reject) => {
      // Create a transaction for the 'invoice' store with readwrite access
      const transaction = db.transaction(['requisition'], 'readwrite');
      const store = transaction.objectStore('requisition');
      
       // Create the requisition object
      const requisitionData = {
        id: ref,
        ref, 
        date,
        season,
        status,
        details: JSON.stringify(info),
      };

      // Add the requisition data to the store
      const request = store.add(requisitionData);

      request.onsuccess = () => {
        console.log('requisition created successfully:', request.result);
        alert_Toast(`requisition ${ref} created successfully`);
        resolve(request.result); // Resolve with the generated ID if needed
      };

      request.onerror = (event) => {
        console.error('Error adding requisition:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in createInvoice:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

//get a requisution
const get1Request = async(ref) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['requisition'], 'readonly');
      const store = transaction.objectStore('requisition');

      // Assuming 'ref' is stored in the 'ref' property of requisition objects
      const request = store.index('ref').get(ref); 

      request.onsuccess = (event) => {
        const requisition = event.target.result;
        if (requisition) {
          resolve(requisition.details); 
        } else {
          console.error('requisition not found.');
          resolve(null); // Or reject with an error
        }
      };

      request.onerror = (event) => {
        console.error(`Error fetching requisition ${ref}:`, event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in getAnInvoice:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

// Update request
const updateRequest = async(ref, details, stats) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase();
    return new Promise((resolve, reject) => {
      
      const transaction = db.transaction(['requisition'], 'readwrite');
      const store = transaction.objectStore('requisition');

      // Assuming 'ref' is used to find the requisition to update
      const request = store.index('ref').get(ref); // Get the requisition by 'ref'

      request.onsuccess = (event) => {
        const requestToUpdate = event.target.result;

        if (requestToUpdate) {
          // Update the 'details' and 'status' property
          if(details !== ''){
            requestToUpdate.details = details;
            requestToUpdate.status = stats ? stats : 'saved'; 
          }else{ 
            requestToUpdate.status = stats ? stats : 'saved';  
          }

          // Put the updated object back into the store
          const updateRequestInfo = store.put(requestToUpdate);

          updateRequestInfo.onsuccess = () => {
            console.log('requisition updated successfully');
            alert_Toast('requisition updated successfully');
            resolve(); // Resolve the promise on successful update
          };

          updateRequestInfo.onerror = (event) => {
            console.error('Error updating requisition:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.error('requisition not found for update.');
          reject(new Error('requisition not found for update.'));
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching invoice for update:', event.target.error);
        reject(event.target.error);
      };
    });
    } catch (error) {
      console.error('Error in updateInvoice:', error);
      throw error; // Re-throw to handle the error at a higher level
    }
};

// Delete
const deleteRequest = async (ref) => {
  try {
    await openDatabase();

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['requisition'], 'readwrite');
      const store = transaction.objectStore('requisition');

      // Ensure 'ref' is a string (for debugging and type safety)
      const refString = typeof ref === 'string' ? ref : String(ref);
      console.log('refString:', refString); // Debugging line

      // Use the index to open a cursor for the specific 'ref'
      const request = store.index('ref').openCursor(IDBKeyRange.only(refString));

      request.onsuccess = (event) => {
        const cursor = event.target.result;

        if (cursor) {
           const deleteRequestInfo = cursor.delete();

          deleteRequestInfo.onsuccess = () => {
            deleteRequisitionImages(ref);
            alert_Toast('Requisition deleted');
            resolve(); 
          };

          deleteRequestInfo.onerror = (event) => {
            console.error('Error deleting requisition:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.log('Requisition not found for deletion (refString:', refString, ')');
          resolve(); // Resolve even if not found (no error thrown)
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching requisition for deletion:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in deleteRequest:', error);
    throw error; 
  }
};

//delete invoice front end function
const delRequest = async (ref) => {
  const { value } = await Dialog.confirm({
    title: 'Delete Requisition',
    message: `you are about to delete this requsition`,
    okButtonTitle: 'yes delete',
  });

    if(value == 1){
      await deleteRequest(ref);
      await alert_Toast('requisition deleted'); 
      //reload list
      requestList();  
    }  
};

//delete invoice front end function
const verifyBook = async (ref) => {
  const { value } = await Dialog.confirm({
    title: 'Requisition verification',
    message: `Please confirm the books collected before verification`,
    okButtonTitle: 'yes verify',
  });

    if(value == 1){
      await completeRequestVerification(ref);
      await alert_Toast('requisition verified'); 
      //show requisition
      displayRequest(ref);  
    }  
};


window.createRequest = createRequest;
window.getRequestList = getRequestList;
window.get1Request = get1Request;
window.updateRequest = updateRequest;
window.deleteRequest = deleteRequest;




/*******************  school account code       *************** */

const getAllSchool = async () => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['schools'], 'readonly');
      const store = transaction.objectStore('schools');
      const request = store.getAll(); 

      request.onsuccess = (event) => {
        const requi = event.target.result;
        resolve(requi);
      };

      request.onerror = (event) => {
        console.error('Error fetching school list:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in getAllSchool:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};

// Function to create a new school
const createSchool = async (school_ref, info) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase(); 
    const {school, address} = info;
    return new Promise((resolve, reject) => {
      // Create a transaction for the 'schools' store with readwrite access
      const transaction = db.transaction(['schools'], 'readwrite');
      const store = transaction.objectStore('schools');
      
       // Create the schools object
      const schoolData = {
        school_id: school_ref,
        school_ref,   
        school_name: school,
        school_address: address,  
      };

      // Add the schools data to the store
      const request = store.add(schoolData);

      request.onsuccess = () => {
        console.log('schools created successfully:', request.result);
        alert_Toast(`schools ${school_ref} created successfully`);
        resolve(request.result); // Resolve with the generated ID if needed
      };

      request.onerror = (event) => {
        console.error('Error adding schools:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in createSchool:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
}; 

//get a schools
const get1School = async(ref) => {
try {
  // Ensure the database is open before proceeding
  await openDatabase(); 
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['schools'], 'readonly');
    const store = transaction.objectStore('schools');

    // Assuming 'ref' is stored in the 'ref' property of schools objects
    const request = store.index('id').get(ref); 

    request.onsuccess = (event) => {
      const school = event.target.result;
      if (school) {
        resolve(school); 
      } else {
        console.error('school not found.');
        resolve(null); // Or reject with an error
      }
    };

    request.onerror = (event) => {
      console.error(`Error fetching school ${ref}:`, event.target.error);
      reject(event.target.error);
    };
  });
} catch (error) {
  console.error('Error in getAnInvoice:', error);
  throw error; // Re-throw to handle the error at a higher level
}
};

const updateSchool = async(ref, details) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase();
    const {school_name, school_address, contact, receiver} = details;
    return new Promise((resolve, reject) => {
      
      const transaction = db.transaction(['schools'], 'readwrite');
      const store = transaction.objectStore('schools');

      // Assuming 'ref' is used to find the invoice to update
      const request = store.index('id').get(ref); // Get the invoice by 'ref'

      request.onsuccess = (event) => {
        const schoolToUpdate = event.target.result;

        if (schoolToUpdate) {
          // Update  
          //schoolToUpdate.school_address = school_address;
          //schoolToUpdate.school_name = school_name ;
          schoolToUpdate.contact_name = receiver;
          schoolToUpdate.contact_phone = contact ; 

          // Put the updated object back into the store
          const updatSchoolInfo = store.put(schoolToUpdate);

          updatSchoolInfo.onsuccess = () => {
            console.log('school updated successfully');
            resolve(); // Resolve the promise on successful update
          };

          updatSchoolInfo.onerror = (event) => {
            console.error('Error updating school:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.error('school not found for update.');
          reject(new Error('school not found for update.'));
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching school for update:', event.target.error);
        reject(event.target.error);
      };
    });
    } catch (error) {
      console.error('Error in updateSchool:', error);
      throw error; // Re-throw to handle the error at a higher level
    }
};

// Delete
const deleteSchool = async(ref) => {
  try {
    // Ensure the database is open before proceeding
    await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['schools'], 'readwrite');
      const store = transaction.objectStore('schools');

      // Assuming 'ref' is used to find the schools to delete
      const request = store.index('id').openCursor(IDBKeyRange.only(ref));

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // Delete the schools from the store
          const deleteSchoolInfo = cursor.delete(); 

          deleteSchoolInfo.onsuccess = () => {
            console.log('school deleted successfully');
            resolve(); // Resolve the promise on successful deletion
          };

          deleteSchoolInfo.onerror = (event) => {
            console.error('Error deleting school:', event.target.error);
            reject(event.target.error);
          };
        } else {
          console.log('school not found for deletion.');
          resolve(); // Resolve even if not found (no error thrown)
        }
      };

      request.onerror = (event) => {
        console.error('Error fetching schools for deletion:', event.target.error);
        reject(event.target.error);
      };
    });
  } catch (error) {
    console.error('Error in deleteSchool:', error);
    throw error; // Re-throw to handle the error at a higher level
  }
};
   
  window.getAllSchool = getAllSchool;
  window.createSchool = createSchool;
  window.get1School = get1School;
  window.updateSchool = updateSchool;
  window.deleteSchool = deleteSchool;



/*******************  image capture and storage code       *************** */

async function takePictureAndDisplay() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
  
      if (image) {
        let imageData = image.base64String;
        imagesArray.push(imageData);
        showCapturedImages(imagesArray); 
      }
    } catch (error) {
      console.error('Error capturing or storing image:', error);
    }
}
  
async function deleteRequisitionImages(ref) {
  try {
    await openDatabase(); 

    const transaction = db.transaction(['request_images'], 'readwrite');
    const store = transaction.objectStore('request_images');
    const index = store.index('ref');

    const getRequest = index.get(ref);

    getRequest.onsuccess = (event) => {
      const existingImageEntry = event.target.result;

      if (existingImageEntry) {
        const deleteRequest = store.delete(existingImageEntry.id); 

        deleteRequest.onsuccess = () => {
          console.log(`Images for ref ${ref} deleted successfully`);
        };

        deleteRequest.onerror = (event) => {
          console.error(`Error deleting images for ref ${ref}:`, event.target.error);
        };
      } 
      // No else block needed here - if no image is found, nothing to delete
    };

    getRequest.onerror = (event) => {
      console.error(`Error getting images for ref ${ref}:`, event.target.error);
    };

  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
}

async function storeImageInDB(imageArray, ref) {
  try {
    await openDatabase();
    console.log(ref);
    const transaction = db.transaction(['request_images'], 'readwrite');
    const store = transaction.objectStore('request_images');
    const index = store.index('ref');

    // 1. Try to get existing image entry for the given 'ref'
    const getRequest = index.get(ref);

    getRequest.onsuccess = (event) => {
      const existingImageEntry = event.target.result;

      if (existingImageEntry) {
        // 2. Images associated with 'ref' exist, delete the entry first
        const deleteRequest = store.delete(existingImageEntry.id); // Delete by 'id'

        deleteRequest.onsuccess = () => {
          console.log(`Images for ref ${ref} deleted successfully`);
          // 3. Now add the new image array as a new entry
          addNewImageEntry(store, ref, imageArray);
        };

        deleteRequest.onerror = (event) => {
          console.error(`Error deleting images for ref ${ref}:`, event.target.error);
        };
      } else {
        // 4. No existing images for this 'ref', just add the new entry
        addNewImageEntry(store, ref, imageArray);
      }
    };

    getRequest.onerror = (event) => {
      console.error(`Error getting images for ref ${ref}:`, event.target.error);
    };

  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
}

// Helper function to add a new image entry
function addNewImageEntry(store, ref, imageArray) {
  const addRequest = store.add({ 
    id: ref, 
    ref: ref, 
    request_images: imageArray 
  });

  addRequest.onsuccess = () => {
    console.log(`New images for ref ${ref} added successfully`);
  };

  addRequest.onerror = (event) => {
    console.error(`Error adding images for ref ${ref}:`, event.target.error);
  };
}
 
async function displayStoredImages(ref) {
  try {
    await openDatabase();

    const transaction = db.transaction(['request_images'], 'readonly');
    const store = transaction.objectStore('request_images');
    const index = store.index('ref');

    // Use index.get() to retrieve data by the 'ref' index
    const getRequest = index.get(ref); 

    getRequest.onsuccess = (event) => {
      const storedImages = event.target.result?.request_images || [];

      storedImages.forEach(imageData => {
        const imgElement = document.createElement('img');
        imgElement.src = `data:image/jpeg;base64,${imageData}`;
        document.body.appendChild(imgElement); 
      });
    };

    getRequest.onerror = (event) => {
      console.error('Error retrieving images:', event.target.error);
    };

  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
}


async function showCapturedImages() {
  try {
    let picBox = document.getElementById('picBox');
    picBox.innerHTML = '';
      imagesArray.forEach(imageData => {
        const imgElement = document.createElement('img');
        imgElement.classList.add('requestImages');
        imgElement.src = `data:image/jpeg;base64,${imageData}`;
        picBox.appendChild(imgElement);
      });


  } catch (error) {
    console.error('Error accessing images:', error);
  }
}


/*******************       other codes       *************** */

// async function getDeviceInfo() {
//     let info = await Device.getInfo();
//     return info;
// };

// window.onload = start;function start() {
//     getDeviceInfo().then(info => {
//       console.log(JSON.stringify(info, null, 4));
//     });
// }

//toast alert code
const alert_Toast = async (msg) => {
    await Toast.show({
      text: msg,
      position: 'top',
      duration: 'long',
    });
};

//network status codes
await Network.addListener('networkStatusChange', status => {
    console.log('Network status changed', status);
  });

await Network.getStatus().then(status => {
    console.log("Internet Status:", status.connected,"Internet Type:", status.connectionType);
  });

const enablePrivacy = async () => {
  await PrivacyScreen.enable();
};

const disablePrivacy = async () => {
  await PrivacyScreen.disable();
};





/*******************       conver invoice to image and share codes       *************** */

// Function to convert canvas to Blob
const convertCanvasToBlob = async (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to Blob'));
      }
    }, 'image/png');
  });
};

// Function to convert Blob to Base64
const convertBlobToBase64 = async (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (result) {
        resolve(result.split(',')[1]); // Remove the data URL prefix
      } else {
        reject(new Error('Failed to read Blob as Data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// Function to save Base64 data to filesystem
const saveToFilesystem = async (base64Data, fileName) => {
  try {
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents,
      encoding: Encoding.Base64,
    });

    return savedFile.uri;
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
};

// Function to capture full page
const captureFullPage = async (element) => {
  const chunks = [];
  let startY = 0;

  // Get the total height of the element and the viewport height
  const totalHeight = element.scrollHeight;
  const viewportHeight = window.innerHeight; 
  
  while (startY < totalHeight) {
    // Scroll to the current position
    element.scrollTo(0, startY);
    // Ensure the content is fully rendered before capturing
    await new Promise(resolve => setTimeout(resolve, 500)); // Adjust timeout if necessary

    // Capture the current viewport
    const canvas = await html2canvas(element, {
      useCORS: true,
      logging: true,
      allowTaint: true,
      scale: window.devicePixelRatio,
    });

    // Check if the canvas has content (not empty)
    if (canvas.toDataURL('image/png').length > 0) {
      chunks.push(canvas);
    }

    // Move to the next section, adjust step size to prevent overlap
    startY += viewportHeight;
  }

  return chunks;
};

// Function to stitch canvases
const stitchCanvases = (canvases) => {
  const totalWidth = canvases[0].width;
  const totalHeight = canvases.reduce((sum, canvas) => sum + canvas.height, 0);
  const stitchedCanvas = document.createElement('canvas');
  stitchedCanvas.width = totalWidth;
  stitchedCanvas.height = totalHeight;
  const ctx = stitchedCanvas.getContext('2d');

  let currentY = 0;
  canvases.forEach(canvas => {
    ctx.drawImage(canvas, 0, currentY);
    currentY += canvas.height;
  });

  return stitchedCanvas;
};

// Function to share the full page
const shareInvoice = async (element, r_id) => {
  try { 
    const chunks = await captureFullPage(element);
    const stitchedCanvas = stitchCanvases(chunks);

    // Convert the stitched canvas to Blob
    const blob = await convertCanvasToBlob(stitchedCanvas);

    // Convert Blob to Base64
    const base64Data = await convertBlobToBase64(blob);
     
    // Save to Filesystem
    const fileName = `invoice_${r_id}.png`;
    const savedFileUri = await saveToFilesystem(base64Data, fileName);

    // Share the file
    await Share.share({
      title: 'Share Invoice',
      files: [savedFileUri],
    });

    await alert_Toast('Invoice successfully shared');

  } catch (error) {
    await Dialog.alert({
      title: 'Failed',
      message: 'Unable to share invoice',
    });
    console.error('Error sharing invoice:', error);
  }
};




/*******************       front end click event listerners codes       *************** */
document.addEventListener('click', function(event) {
  let appBody = document.getElementById("content_body"); 
  
  if (event.target && event.target.matches('[name="shareBtn"]')) {
      // Handle the event for elements with class 'dynamic-button'
      const el_id = event.target.id;

      async function buildReceipt(el_id) {
        // Retrieve the array from local storage
        const storedOrder = await getAnInvoice(el_id); 
        let myOrder = [];
        if (storedOrder) {
            myOrder = JSON.parse(storedOrder);
        } else {
            myOrder = [];
        }

        if (typeof myOrder === 'object' && myOrder !== null){
        
          appBody.style.cssText = `    
                  background-color: #fff;
                  padding: 1rem;
                  height: auto;
                  overflow: auto;
                  text-transform: capitalize;
                  padding-top: 10px; 
          `;

            cost = 0;
                let cart_table = document.createElement('table');
                cart_table.style.cssText = `box-shadow: 0px 0px 3px #6d6d6d;`;
                let tBody = document.createElement('tbody');
                let tHead = document.createElement('tr');
                tHead.innerHTML = `
                    <th>Book title </th> <th>price</th> <th >qty</th> <th>cost</th> 
                `;
                tBody.appendChild(tHead);
                myOrder.collections.forEach(item => {
                    let prize = getPrice(item.bk_sch, Number(item.b_id));
                    let row = document.createElement('tr');
                    row.innerHTML = `<td style="text-align:left;">${item.book}</td> 
                                    <td>₦${addCommasToNumber(prize)}</td> 
                                    <td >${item.qnt}</td> 
                                    <td >₦${addCommasToNumber(prize * item.qnt)}</td>               
                                    `;
                    tBody.appendChild(row);

                    cost += prize * item.qnt;
                });

                cart_table.appendChild(tBody);
                appBody.appendChild(cart_table);
                let disCal = cost * (myOrder.rate / 100);
                //hide discount info if no discount is given
                let dis = myOrder.rate === '0' ? 'none' : '';

                let sum_table = document.createElement('div');
                sum_table.style.cssText = `font-size:smaller; text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;`
                sum_table.innerHTML = `
                <div class="list" style="border-bottom: 1px solid #00000066;"> <span>cost of books:</span> <span><b>₦${addCommasToNumber(cost - disCal)}</b> <small style="margin-left: 1rem; display: ${dis}"><b>(discounted: ₦${addCommasToNumber(disCal.toFixed())})</b></small></span></div>   
            
                <div class="list"> Payment date: <b>${myOrder.payday}</b></div>
                <div class="list">verified by:  <b>${myOrder.receiver}</b></div>
                <div class="list" style="border-bottom: 1px solid #00000066;"> receiver contact: <b>${myOrder.contact}</b> </div>  
            
                <div class="list"> invoiced on: <b>${myOrder.date}</b> </div> 
                <div class="list">invoice status: <b>${myOrder.status}</b></div>
            `;
                
                let tFoot = document.createElement('div');
                tFoot.classList.add('btm_nav_box');
                tFoot.innerHTML = `
                    <div class="list cancle-btn" onclick="clearCart()">
                        <div style="font-size: 1rem; font-weight: bolder; margin-right: 13x;" class="bi bi-x-circle-fill"></div> cancel 
                    </div>
                    <div class="list proceed-btn nxt-btn" id="checkout" onclick="add_invoice()">modify 
                        <div style="font-size: 1rem; font-weight: bolder;  margin-left: 13x;" class="bi bi-pencil-fill"></div> 
                    </div>
                `;
                appBody.innerHTML = ''; //clear content body
                appBody.innerHTML = ` 
                <div class="list">
                    <span>sales invoice</span> 
                    <span>no: <b>${myOrder.ref.toUpperCase()}</b></span>
                </div> 
                      
                    <div style="  box-shadow: 0px 0px 3px #6d6d6d;
                        justify-items: center; align-items: center; 
                        margin: auto; 
                        width: 100%; background:#fff;">
                    
                        <img src="bk_imgs/afem_header.png" style="width: 100%; margin-bottom: -6px; max-width: 400px; " />

                    </div>
                    
                    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                        <div class="invoiceTab"><small class="fb-ar">School: </small>      <small style="text-align: left; text-transform: capitalize">${myOrder.school}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left">${myOrder.address}</small></div> 
                    </div> 
                    `;
                appBody.appendChild(cart_table);
                appBody.appendChild(sum_table);
                
        }
      }

      buildReceipt.then(()=>{ shareInvoice(appBody, el_id) });
         
  }

  // Array of class selectors to check
  const classesToCheck = ['.ibl'];

  // Check if the clicked element matches any of the specified classes
  for (const className of classesToCheck) {
      if (event.target.matches(className)) {
          // Ensure the clicked element has an id
          const el_id = event.target.id;
          if (el_id) {
              // Call your function with the element's id
              delitemfrmInvoice(el_id);
          } else {
              console.warn('The clicked element does not have an id.');
          }

          break; // Exit loop once a match is found
      }
  }

  // Array of class selectors to check
  const clsBtn = ['.invc_btn'];
    // Check if the clicked element matches any of the specified classes
    for (const clsName of clsBtn) {
      if (event.target.matches(clsName)) { 
          // Ensure the clicked element has an id
          const el_id = event.target.id;
          if (el_id) {
              // Call your function with the element's id
              delInvoice(el_id);
          } else {
              console.warn('The clicked element does not have an id.');
          }

          break; // Exit loop once a match is found
      }
  }

  if (event.target && event.target.matches('[name="requestPic"]')) {
    takePictureAndDisplay();
  }

  if (event.target && event.target.matches('[name="uploadRequestPic"]')) {
    const ref = event.target.id; 
    storeImageInDB(imagesArray, ref).then(()=>{
      let details = '';
      updateRequest(ref, details, 'pending');
      verifyRequest(ref);
      if (oldPop) { 
        oldPop.firstElementChild.innerHTML = '';
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
      } 
    });

  }

  if (event.target && event.target.matches('[name="rqt_btn"]')) {
    const id = event.target.id; 
    delRequest(id);
  }

  if (event.target && event.target.matches('[name="comfirm_verify"]')) {
    const id = event.target.id; 
    verifyBook(id);
  }

  if (event.target && event.target.matches('[name="rqt_pic"]')) {
    const id = event.target.id; 
    displayStoredImages(id);
  }

});

// create database 
await createDB();
 