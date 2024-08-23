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
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

let db;// Declare db in the outer scope to access it in other functions


const DATABASE_NAME = 'repLogDB';
const DATABASE_VERSION = 1;

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
        db.createObjectStore('schools', { keyPath: 'id', autoIncrement: true });
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
        db.createObjectStore('custom_price', { keyPath: 'id', autoIncrement: true });
      }
      //table to store requisition
      if (!db.objectStoreNames.contains('requisition')) {
        const invoiceStore = db.createObjectStore('requisition', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store verified requisition i.e waybill
      if (!db.objectStoreNames.contains('waybill')) {
        const invoiceStore = db.createObjectStore('waybill', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'date' index here:
        invoiceStore.createIndex('date', 'date', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments submited
      if (!db.objectStoreNames.contains('payment')) {
        const invoiceStore = db.createObjectStore('payment', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments verified i.e sales
      if (!db.objectStoreNames.contains('sales')) {
        const invoiceStore = db.createObjectStore('sales', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
    };
  });
};
 
// Function to open the database
const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('repLogDB', 1); // Replace with your database name and version

    request.onupgradeneeded = (event) => {
      // Handle database schema creation/updates if needed
      const db = event.target.result;

      // Create stores (tables)
      //table to store school info
      if (!db.objectStoreNames.contains('schools')) {
        db.createObjectStore('schools', { keyPath: 'id', autoIncrement: true });
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
        db.createObjectStore('custom_price', { keyPath: 'id', autoIncrement: true });
      }
      //table to store requisition
      if (!db.objectStoreNames.contains('requisition')) {
        const invoiceStore = db.createObjectStore('requisition', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store verified requisition i.e waybill
      if (!db.objectStoreNames.contains('waybill')) {
        const invoiceStore = db.createObjectStore('waybill', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments submited
      if (!db.objectStoreNames.contains('payment')) {
        const invoiceStore = db.createObjectStore('payment', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
      }
      //table to store payments verified i.e sales
      if (!db.objectStoreNames.contains('sales')) {
        const invoiceStore = db.createObjectStore('sales', { keyPath: 'id' }); // Assuming 'id' is your key
        // Create the 'ref' index here:
        invoiceStore.createIndex('ref', 'ref', { unique: true }); // Assuming 'ref' should be unique
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
    const { ref, school, date, session, status} = info;
    return new Promise((resolve, reject) => {
      // Create a transaction for the 'invoice' store with readwrite access
      const transaction = db.transaction(['invoice'], 'readwrite');
      const store = transaction.objectStore('invoice');
      
       // Create the invoice object
      const invoiceData = {
        id: ref,
        ref,
        school,
        date,
        session,
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

 

async function takePictureAndStore() {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    if (image) {
      await storeImageInDB(image.base64String);
    }
  } catch (error) {
    console.error('Error capturing or storing image:', error);
  }
}

async function storeImageInDB(imageData) {
  try {
    await openDatabase();

    const transaction = db.transaction(['images'], 'readwrite');
    const store = transaction.objectStore('images');

    // 1. Get the existing image array (if any)
    const getRequest = store.get('allImages'); // Assuming you use a single key for all images

    getRequest.onsuccess = (event) => {
      const existingImages = event.target.result?.images || []; // Get existing or initialize as empty

      // 2. Add the new image data
      const updatedImages = [...existingImages, imageData];

      // 3. Store the updated array
      const putRequest = store.put({ id: 'allImages', images: updatedImages }); 

      putRequest.onsuccess = () => {
        console.log('Images updated successfully');
      };

      putRequest.onerror = (event) => {
        console.error('Error updating images:', event.target.error);
      };
    };

    getRequest.onerror = (event) => {
      console.error('Error getting images:', event.target.error);
    };

  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
}

 async function displayStoredImages() {
  try {
    await openDatabase();
    const transaction = db.transaction(['images'], 'readonly');
    const store = transaction.objectStore('images');

    const request = store.get('allImages');

    request.onsuccess = (event) => {
      const storedImages = event.target.result?.images || [];

      storedImages.forEach(imageData => {
        const imgElement = document.createElement('img');
        imgElement.src = `data:image/jpeg;base64,${imageData}`;
        document.body.appendChild(imgElement);
      });
    };

    request.onerror = (event) => {
      console.error('Error retrieving images:', event.target.error);
    };
  } catch (error) {
    console.error('Error accessing IndexedDB:', error);
  }
}

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
          const updateRequest = store.put(invoiceToUpdate);

          updateRequest.onsuccess = () => {
            console.log('Invoice updated successfully');
            resolve(); // Resolve the promise on successful update
          };

          updateRequest.onerror = (event) => {
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

// Delete
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

// Expose functions to the global scope
window.createInvoice = createInvoice;
window.getInvoiceList = getInvoiceList;
window.getAnInvoice = getAnInvoice;
window.updateInvoice = updateInvoice;
window.deleteInvoice = deleteInvoice;

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
    const { ref, date, session, status} = info;
    return new Promise((resolve, reject) => {
      // Create a transaction for the 'invoice' store with readwrite access
      const transaction = db.transaction(['requisition'], 'readwrite');
      const store = transaction.objectStore('requisition');
      
       // Create the requisition object
      const requisitionData = {
        id: ref,
        ref, 
        date,
        session,
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

      // Assuming 'ref' is used to find the invoice to update
      const request = store.index('ref').get(ref); // Get the invoice by 'ref'

      request.onsuccess = (event) => {
        const invoiceToUpdate = event.target.result;

        if (invoiceToUpdate) {
          // Update the 'details' and 'status' property
          invoiceToUpdate.details = details;
          invoiceToUpdate.status = stats ? stats : 'saved'; 

          // Put the updated object back into the store
          const updateRequest = store.put(invoiceToUpdate);

          updateRequest.onsuccess = () => {
            console.log('Invoice updated successfully');
            resolve(); // Resolve the promise on successful update
          };

          updateRequest.onerror = (event) => {
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

// Delete
const deleteRequest = async(ref) => {
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

window.createRequest = createRequest;
window.getRequestList = getRequestList;
window.get1Request = get1Request;
window.updateRequest = updateRequest;
window.deleteRequest = deleteRequest;

  // Create school account
  const createSchool = async (name, adrs) => {
    const data = [name, adrs];
    try {
      const res = await db.run('INSERT INTO schools (name, address) VALUES (?, ?)', data);
      return res.lastId;
    } 
    catch (err) {
      console.error('Error inserting data:', err);
    } finally {
      await db.close();
    }
  };
  
  // get school list
  const getSchool = async () => {
    try {
      const res = await db.query('SELECT * FROM schools');
      return res.values;
    }
    catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        await db.close();
      }
  };
  
  // Update
  const updateSchool = async (id, name, email) => {
    const data = [name, email, id];
    try{
      const res = await db.run('UPDATE schools SET name = ?, email = ? WHERE id = ?', data);
      return res.changes.changes;
    }
    catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      await db.close();
    }
  
  };
  
  // Delete
  const deleteSchool = async (id) => {
    try{
      const res = await db.run('DELETE FROM schools WHERE id = ?', [id]);
      return res.changes.changes;
    }
    catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      await db.close();
    }
  
  }; 
 


const setStatusBarStyleDark = async () => {
  await StatusBar.setStyle({ style: Style.Dark });
};

setStatusBarStyleDark();

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
            editDraft(in_ref);
            } else {
            // Log a message indicating the book was not found in the cart
            console.log(`Book not found in invoice: ${bookToRemove.title}`);
            } 
    }
 
};

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

// async function getDeviceInfo() {
//     let info = await Device.getInfo();
//     return info;
// };

// window.onload = start;function start() {
//     getDeviceInfo().then(info => {
//       console.log(JSON.stringify(info, null, 4));
//     });
// }

const alert_Toast = async (msg) => {
    await Toast.show({
      text: msg,
      position: 'top',
      duration: 'long',
    });
};

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

document.addEventListener('click', function(event) {
  let appBody = document.getElementById("content_body"); 
  
  if (event.target && event.target.matches('[name="shareBtn"]')) {
      // Handle the event for elements with class 'dynamic-button'
      const el_id = event.target.id;
          // Retrieve the array from local storage
      const storedOrder = localStorage.getItem(el_id); 
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

    shareInvoice(appBody, el_id);
         
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

});

// create database 
await createDB();
 