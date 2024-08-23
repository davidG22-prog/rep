const appBody = document.getElementById("content_body");
const allBooks = document.getElementById('allBooks');

const showMore = document.getElementById('more'); 
const checkoutBtn = document.getElementById('checkout'); 
let oldPop = document.querySelector('.pop_background');
let cost = 0; let paymentDate; let currentCost = 0;
let cartItemsAry = []; let invoiceItemsAry = [];  let supVal = ''; let bkVal; let showingCart;
let in_school = ''; let in_address = '';  let reqObj = {};
let disVal;
let setlog = new Set(); 
let priceList = ''; let checkStat = ''; let priceLabel = 'official pricelist';

const home =()=>{
    window.location.reload();
}
 
function addCommasToNumber(num) {
  // Convert the number to a string and split it into an array of digits
  const numArr = num.toString().split('');
  
  // Reverse the array to make it easier to iterate
  numArr.reverse();
  
  // Initialize an empty array to store the formatted digits
  const formattedArr = [];
  
  // Iterate over the array of digits
  for (let i = 0; i < numArr.length; i++) {
    // If the current index is divisible by 3 and not the first digit,
    // add a comma before the current digit
    if (i > 0 && i % 3 === 0) {
      formattedArr.push(',');
    }
    
    // Add the current digit to the formatted array
    formattedArr.push(numArr[i]);
  }
  
  // Reverse the formatted array and join it into a string
  const formattedNum = formattedArr.reverse().join('');
  
  return formattedNum;
}

const drop = () =>{ 
      // Select all elements with class "list" and add a single event listener at a higher level
    const listElements = document.querySelectorAll(".list");
 
    if(listElements){
        const myDropdowns = document.querySelectorAll(".myDropdown");

        myDropdowns.forEach(drop => {
            const prevSibling = drop.previousElementSibling; 
            const prevSiblingWidth = prevSibling.offsetWidth;

            drop.style.width = `calc(${prevSiblingWidth}px - 2rem)`;
        }); 

       listElements.forEach(listElement => { 
        
        listElement.addEventListener('click', (event) => {

            const targetList = event.currentTarget;

            if (!targetList) { 
                return;
            }
    
            const nextElementSibling = targetList.nextElementSibling;
    
            if (!nextElementSibling || !nextElementSibling.classList.contains('myDropdown')) {
                console.log('No dropdown found as the next element sibling');
                return;
            }
    
            const dropdown = nextElementSibling;
            const previousSibling = dropdown.previousElementSibling;
    
            if (!previousSibling || previousSibling !== targetList) {
                console.log('No previous sibling element found for dropdown.');
                return;
            }       

            myDropdowns.forEach(drop => {
                // Check if the dropdown is not the clicked element sibling
                if (drop !== nextElementSibling) {
                    drop.style.display = "none";
                }
            });

            const previousSiblingWidth = previousSibling.offsetWidth;
            dropdown.style.width = `calc(${previousSiblingWidth}px - 2.8rem)`;
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
                    
        });
        });    
    }
   
}

const bookList = [
    {'nursery' : [
        {id : 1, name : "STARTING NUMBER WORK FOR PREPARATORY", info :"<b>ISBN</b>: 978-978-37450-8-5 " , image :"snw.png"},
        {id : 2, name : "STARTING MATHEMATICS FOR NURSERY BOOK 1", info :"<b>ISBN</b>: 978-978-36534-3-1" , image :"sm1.png"},
        {id : 3, name : "STARTING MATHEMATICS FOR NURSERY BOOK 2", info :"<b>ISBN</b>: 978-978-36534-9-2" , image :"sm2.png"},
        {id : 4, name : "STARTING MATHEMATICS FOR NURSERY BOOK 3", info :"<b>ISBN</b>: 978-978-36534-4-X" , image :"sm3.png"},
        {id : 5, name : "STARTING ALPHABET WORK FOR PREPARATORY", info :"<b>ISBN</b>: 978-978-49022-2-9" , image :"sa.png"},
        {id : 6, name : "STARTING ENGLISH FOR NURSERY BOOK 1", info :"<b>ISBN</b>: 978-978-49022-1-2" , image :"se1.png"},
        {id : 7, name : "STARTING ENGLISH FOR NURSERY BOOK 2", info :"<b>ISBN</b>: 978-978-49022-0-5" , image :"se2.png"},
        {id : 8, name : "STARTING ENGLISH FOR NURSERY BOOK 3", info :"<b>ISBN</b>: 978-978-49022-3-5" , image :"se3.png"},
        {id : 9, name : "SPELLING WORD SEARCH BOOK 0", info :"<b>ISBN</b>: 978-978-37450-3-4" , image :"ws0.png"},
        {id : 10, name : "PHONICS FOR NURSERY BOOK 1", info :"<b>ISBN</b>: 978-978-37450-5-0" , image :"p1.png"},
        {id : 11, name : "PHONICS FOR NURSERY BOOK 2", info :"<b>ISBN</b>: 978-978-37450-6-9" , image :"p2.png"},
        {id : 12, name : "PHONICS FOR NURSERY BOOK 3", info :"<b>ISBN</b>: 978-978-37450-7-7" , image :"p3.png"},
        {id : 13, name : "STARTING COLOURING ACTIVITIES BOOK 1", info :"<b>ISBN</b>: 978-978-50934-8-3" , image :"c1.png"},
        {id : 14, name : "STARTING COLOURING ACTIVITIES BOOK 2", info :"<b>ISBN</b>: 978-978-50934-9-0" , image :"c2.png"},
        {id : 15, name : "STARTING COLOURING ACTIVITIES BOOK 3", info :"<b>ISBN</b>: 978-978-50934-0-6" , image :"c3.png"},
        {id : 16, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 1", info :"<b>ISBN</b>: 978-978-50935-6-8" , image :"qr1.png"},
        {id : 17, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 2", info :"<b>ISBN</b>: 978-978-50935-7-5" , image :"qr2.png"},
        {id : 18, name : "VERBAL REASONING FOR NURSERY BOOK 1", info :"<b>ISBN</b>: 978-978-50935-8-2" , image :"vr1.png"},
        {id : 19, name : "VERBAL REASONING FOR NURSERY BOOK 2", info :"<b>ISBN</b>: 978-978-50935-9-9" , image :"vr2.png"}]
    },
    {'primary' : [
        {id : 1, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 1", info :"<b>ISBN</b>: 978-978- 54714-0-3" , image :"sdm1.png"},
        {id : 2, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 2", info :"<b>ISBN</b>: 978-978- 54714-0-1" , image :"sdm2.png"},
        {id : 3, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 3", info :"<b>ISBN</b>: 978-978- 54714-2-7" , image :"sdm3.png"},
        {id : 4, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 4", info :"<b>ISBN</b>: 978-978- 54714-3-4" , image :"sdm4.png"},
        {id : 5, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 5", info :"<b>ISBN</b>: 978-978- 54714-4-1" , image :"sdm5.png"},
        {id : 6, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 6", info :"<b>ISBN</b>: 978-978- 54714-5-" , image :"sdm6.png"},
        
        {id : 7, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 1", info :"<b>ISBN</b>: 978-978-58515-2-6" , image :"sde1.png"},
        {id : 8, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 2", info :"<b>ISBN</b>: 978-978-58515-5-7" , image :"sde2.png"},
        {id : 9, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 3", info :"<b>ISBN</b>: 978-978-58515-0-2" , image :"sde3.png"},
        {id : 10, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 4", info :"<b>ISBN</b>: 978-978-58515-3-3" , image :"sde4.png"},
        {id : 11, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 5", info :"<b>ISBN</b>: 978-978-58515-4-0" , image :"sde5.png"},
        {id : 12, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 6", info :"<b>ISBN</b>: 978-978-58515-1-9" , image :"sde6.png"},
        
        {id : 13, name : "BASIC ENGLISH GRAMMAR BOOK 1", info :"<b>ISBN</b>: 978-978-50934-0-7" , image :"beg1.png"},
        {id : 14, name : "BASIC ENGLISH GRAMMAR BOOK 2", info :"<b>ISBN</b>: 978-978-50934-1-4" , image :"beg2.png"},
        {id : 15, name : "BASIC ENGLISH GRAMMAR BOOK 3", info :"<b>ISBN</b>: 978-978-50934-2-1" , image :"beg3.png"},
        {id : 16, name : "BASIC ENGLISH GRAMMAR BOOK 4", info :"<b>ISBN</b>: 978-978-50934-3-8" , image :"beg4.png"},
        {id : 17, name : "BASIC ENGLISH GRAMMAR BOOK 5", info :"<b>ISBN</b>: 978-978-50934-4-5" , image :"beg5.png"},
        {id : 18, name : "BASIC ENGLISH GRAMMAR BOOK 6", info :"<b>ISBN</b>: 978-978-50934-5-2" , image :"beg6.png"},

        {id : 19, name : "GRAMMAR MADE EASY BOOK 1", info :"<b>ISBN</b>: 978 052 339 1" , image :"g1.png"},
        {id : 20, name : "GRAMMAR MADE EASY BOOK 2", info :"<b>ISBN</b>: 978 052 340 5" , image :"g2.png"},
        {id : 21, name : "GRAMMAR MADE EASY BOOK 3", info :"<b>ISBN</b>: 978 052 352 9" , image :"g3.png"},
        {id : 22, name : "GRAMMAR MADE EASY BOOK 4", info :"<b>ISBN</b>: 978 052 353 7" , image :"g3.png"},
        {id : 23, name : "GRAMMAR MADE EASY BOOK 5", info :"<b>ISBN</b>: 978 052 353 9" , image :"g5.png"},
        
        {id : 24, name : "CULTURAL & CREATIVE ART BOOK 1", info :"<b>ISBN</b>: 978-978-49022-4-3" , image :"cc1.png"},
        {id : 25, name : "CULTURAL & CREATIVE ART BOOK 2", info :"<b>ISBN</b>: 978-978-49022-5-0" , image :"cc2.png"},
        {id : 26, name : "CULTURAL & CREATIVE ART BOOK 3", info :"<b>ISBN</b>: 978-978-49022-6-7" , image :"cc3.png"},
        {id : 27, name : "CULTURAL & CREATIVE ART BOOK 4", info :"<b>ISBN</b>: 978-978-49022-7-4" , image :"cc4.png"},
        {id : 28, name : "CULTURAL & CREATIVE ART BOOK 5", info :"<b>ISBN</b>: 978-978-49022-8-1" , image :"cc5.png"},
        {id : 29, name : "CULTURAL & CREATIVE ART BOOK 6", info :"<b>ISBN</b>: 978-978-49022-9-8" , image :"cc6.png"},

        {id : 30, name : "SPELLING WORD SEARCH BOOK 1", info :"<b>ISBN</b>: 978-978-37450-1-8" , image :"ws1.png"},
        {id : 31, name : "SPELLING WORD SEARCH BOOK 2", info :"<b>ISBN</b>: 978-978-37450-0-X" , image :"ws2.png"},
        {id : 32, name : "SPELLING WORD SEARCH BOOK 3", info :"<b>ISBN</b>: 978-978-37450-2-6" , image :"ws3.png"},
        {id : 33, name : "SPELLING WORD SEARCH BOOK 4", info :"<b>ISBN</b>: 978-978-50935-1-3" , image :"ws4.png"},
        {id : 34, name : "SPELLING WORD SEARCH BOOK 5", info :"<b>ISBN</b>: 978-978-50935-2-0" , image :"ws5.png"},
        {id : 35, name : "SPELLING WORD SEARCH BOOK 6", info :"<b>ISBN</b>: 978-978-50935-3-7" , image :"ws6.png"},
        
        {id : 36, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 1", info :"<b>ISBN</b>: 978-978-50935-5-1" , image :"qrp1.png"},
        {id : 37, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 2", info :"<b>ISBN</b>: 978-978-50937-5-9" , image :"qrp2.png"},
        {id : 38, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 3", info :"<b>ISBN</b>: 978-978-50937-7-3" , image :"qrp3.png"},
        {id : 39, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 4", info :"<b>ISBN</b>: 978-978-50937-9-7" , image :"qrp4.png"},
        {id : 40, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 5", info :"<b>ISBN</b>: 978-978-50937-1-1" , image :"qrp5.png"},
        {id : 41, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 6", info :"<b>ISBN</b>: 978-978-50937-3-5" , image :"qrp6.png"},

        {id : 42, name : "VERBAL REASONING FOR PRIMARY BOOK 1", info :"<b>ISBN</b>: 978-978-50935-4-4" , image :"vrp1.png"},
        {id : 43, name : "VERBAL REASONING FOR PRIMARY BOOK 2", info :"<b>ISBN</b>: 978-978-50937-4-2" , image :"vrp2.png"},
        {id : 44, name : "VERBAL REASONING FOR PRIMARY BOOK 3", info :"<b>ISBN</b>: 978-978-50937-6-6" , image :"vrp3.png"},
        {id : 45, name : "VERBAL REASONING FOR PRIMARY BOOK 3", info :"<b>ISBN</b>: 978-978-50937-8-0" , image :"vrp4.png"},
        {id : 46, name : "VERBAL REASONING FOR PRIMARY BOOK 5", info :"<b>ISBN</b>: 978-978-50937-0-4" , image :"vrp5.png"},
        {id : 47, name : "VERBAL REASONING FOR PRIMARY BOOK 6", info :"<b>ISBN</b>: 978-978-50937-2-8" , image :"vrp6.png"}
    ]
  }
]; 

const officialPrice = [
    {'nursery' : [
        {id: 1, name : "STARTING NUMBER WORK FOR PREPARATORY", price :"2250" },
        {id: 2, name : "STARTING MATHEMATICS FOR NURSERY BOOK 1", price :"2300" },
        {id: 3, name : "STARTING MATHEMATICS FOR NURSERY BOOK 2", price :"2300" },
        {id: 4, name : "STARTING MATHEMATICS FOR NURSERY BOOK 3", price :"2500"},

        {id: 5, name : "STARTING ALPHABET WORK FOR PREPARATORY", price :"2250"},
        {id: 6, name : "STARTING ENGLISH FOR NURSERY BOOK 1", price :"2300" },
        {id: 7, name : "STARTING ENGLISH FOR NURSERY BOOK 2", price :"2300"},
        {id: 8, name : "STARTING ENGLISH FOR NURSERY BOOK 3", price :"2500"},

        {id: 9, name : "SPELLING WORD SEARCH BOOK 0", price :"2350"},

        {id: 10, name : "PHONICS FOR NURSERY BOOK 1", price :"2150"},
        {id: 11, name : "PHONICS FOR NURSERY BOOK 2", price :"2350"},
        {id: 12, name : "PHONICS FOR NURSERY BOOK 3", price :"2350" },

        {id: 13, name : "STARTING COLOURING ACTIVITIES BOOK 1", price :"1800"},
        {id: 14, name : "STARTING COLOURING ACTIVITIES BOOK 2", price :"2000"},
        {id: 15, name : "STARTING COLOURING ACTIVITIES BOOK 3", price :"2000"},

        {id: 16, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 1", price :"2100"},
        {id: 17, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 2", price :"2100"},
        {id: 18, name : "VERBAL REASONING FOR NURSERY BOOK 1", price :"2100"},
        {id: 19, name : "VERBAL REASONING FOR NURSERY BOOK 2", price :"2100"}]
    },
    {'primary' : [
        {id: 1, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 1", price :"3500"},
        {id: 2, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 2", price :"3500" },
        {id: 3, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 3", price :"3500"},
        {id: 4, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 4", price :"3700"},
        {id: 5, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 5", price :"3700" },
        {id: 6, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 6", price :"3700"},
        
        {id: 7, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 1", price :"3500"},
        {id: 8, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 2", price :"3500"},
        {id: 9, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 3", price :"3500"},
        {id: 10, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 4", price :"3700"},
        {id: 11, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 5", price :"3700"},
        {id: 12, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 6", price :"3700"},
        
        {id: 13, name : "BASIC ENGLISH GRAMMAR BOOK 1", price :"3200"},
        {id: 14, name : "BASIC ENGLISH GRAMMAR BOOK 2", price :"2000"},
        {id: 15, name : "BASIC ENGLISH GRAMMAR BOOK 3", price :"2000"},
        {id: 16, name : "BASIC ENGLISH GRAMMAR BOOK 4", price :"2000"},
        {id: 17, name : "BASIC ENGLISH GRAMMAR BOOK 5", price :"2000"},
        {id: 18, name : "BASIC ENGLISH GRAMMAR BOOK 6", price :"2000"},

        {id: 19, name : "GRAMMAR MADE EASY BOOK 1", price :"1600"},
        {id: 20, name : "GRAMMAR MADE EASY BOOK 2", price :"1600"},
        {id: 21, name : "GRAMMAR MADE EASY BOOK 3", price :"1600"},
        {id: 22, name : "GRAMMAR MADE EASY BOOK 4", price :"1800"},
        {id: 23, name : "GRAMMAR MADE EASY BOOK 5", price :"1800"},
       
        {id: 24, name : "CULTURAL & CREATIVE ART BOOK 1", price :"2500"},
        {id: 25, name : "CULTURAL & CREATIVE ART BOOK 2", price :"2500"},
        {id: 26, name : "CULTURAL & CREATIVE ART BOOK 3", price :"2500"},
        {id: 27, name : "CULTURAL & CREATIVE ART BOOK 4", price :"2500"},
        {id: 28, name : "CULTURAL & CREATIVE ART BOOK 5", price :"2500"},
        {id: 29, name : "CULTURAL & CREATIVE ART BOOK 6", price :"2500"},

        {id: 30, name : "SPELLING WORD SEARCH BOOK 1", price :"1800"},
        {id: 31, name : "SPELLING WORD SEARCH BOOK 2", price :"1800"},
        {id: 32, name : "SPELLING WORD SEARCH BOOK 3", price :"1800"},
        {id: 33, name : "SPELLING WORD SEARCH BOOK 4", price :"1900"},
        {id: 34, name : "SPELLING WORD SEARCH BOOK 5", price :"1900"},
        {id: 35, name : "SPELLING WORD SEARCH BOOK 6", price :"1900"},
        
        {id: 36, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 1", price :"2000"},
        {id: 37, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 2", price :"2000"},
        {id: 38, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 3", price :"2000"},
        {id: 39, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 4", price :"2000"},
        {id: 40, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 5", price :"2000"},
        {id: 41, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 6", price :"2000"},

        {id: 42, name : "VERBAL REASONING FOR PRIMARY BOOK 1", price :"2000"},
        {id: 43, name : "VERBAL REASONING FOR PRIMARY BOOK 2", price :"2000"},
        {id: 44, name : "VERBAL REASONING FOR PRIMARY BOOK 3", price :"2000"},
        {id: 45, name : "VERBAL REASONING FOR PRIMARY BOOK 4", price :"2000"},
        {id: 46, name : "VERBAL REASONING FOR PRIMARY BOOK 5", price :"2000"},
        {id: 47, name : "VERBAL REASONING FOR PRIMARY BOOK 6", price :"2000"}
    ]
  }
];

const customPrice = [
    {'nursery' : [
        {id: 1, name : "STARTING NUMBER WORK FOR PREPARATORY", price :"2400" },
        {id: 2, name : "STARTING MATHEMATICS FOR NURSERY BOOK 1", price :"2500" },
        {id: 3, name : "STARTING MATHEMATICS FOR NURSERY BOOK 2", price :"2500" },
        {id: 4, name : "STARTING MATHEMATICS FOR NURSERY BOOK 3", price :"2700"},

        {id: 5, name : "STARTING ALPHABET WORK FOR PREPARATORY", price :"2400"},
        {id: 6, name : "STARTING ENGLISH FOR NURSERY BOOK 1", price :"2500" },
        {id: 7, name : "STARTING ENGLISH FOR NURSERY BOOK 2", price :"2500"},
        {id: 8, name : "STARTING ENGLISH FOR NURSERY BOOK 3", price :"2700"},

        {id: 9, name : "SPELLING WORD SEARCH BOOK 0", price :"2500"},

        {id: 10, name : "PHONICS FOR NURSERY BOOK 1", price :"2300"},
        {id: 11, name : "PHONICS FOR NURSERY BOOK 2", price :"2500"},
        {id: 12, name : "PHONICS FOR NURSERY BOOK 3", price :"2500" },

        {id: 13, name : "STARTING COLOURING ACTIVITIES BOOK 1", price :"2000"},
        {id: 14, name : "STARTING COLOURING ACTIVITIES BOOK 2", price :"2200"},
        {id: 15, name : "STARTING COLOURING ACTIVITIES BOOK 3", price :"2200"},

        {id: 16, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 1", price :"2200"},
        {id: 17, name : "QUANTITATIVE REASONING FOR NURSERY BOOK 2", price :"2200"},
        {id: 18, name : "VERBAL REASONING FOR NURSERY BOOK 1", price :"2200"},
        {id: 19, name : "VERBAL REASONING FOR NURSERY BOOK 2", price :"2200"}]
    },
    {'primary' : [
        {id: 1, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 1", price :"3700"},
        {id: 2, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 2", price :"3700" },
        {id: 3, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 3", price :"3700"},
        {id: 4, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 4", price :"3900"},
        {id: 5, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 5", price :"3900" },
        {id: 6, name : "STANDARD MATHEMATICS FOR PRIMARY SCHOOL BOOK 6", price :"3900"},
        
        {id: 7, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 1", price :"3700"},
        {id: 8, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 2", price :"3700"},
        {id: 9, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 3", price :"3700"},
        {id: 10, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 4", price :"3900"},
        {id: 11, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 5", price :"3900"},
        {id: 12, name : "STANDARD ENGLISH FOR PRIMARY SCHOOL BOOK 6", price :"3900"},
        
        {id: 13, name : "BASIC ENGLISH GRAMMAR BOOK 1", price :"3200"},
        {id: 14, name : "BASIC ENGLISH GRAMMAR BOOK 2", price :"2200"},
        {id: 15, name : "BASIC ENGLISH GRAMMAR BOOK 3", price :"2200"},
        {id: 16, name : "BASIC ENGLISH GRAMMAR BOOK 4", price :"2200"},
        {id: 17, name : "BASIC ENGLISH GRAMMAR BOOK 5", price :"2200"},
        {id: 18, name : "BASIC ENGLISH GRAMMAR BOOK 6", price :"2200"},

        {id: 19, name : "GRAMMAR MADE EASY BOOK 1", price :"1800"},
        {id: 20, name : "GRAMMAR MADE EASY BOOK 2", price :"1800"},
        {id: 21, name : "GRAMMAR MADE EASY BOOK 3", price :"1800"},
        {id: 22, name : "GRAMMAR MADE EASY BOOK 4", price :"2000"},
        {id: 23, name : "GRAMMAR MADE EASY BOOK 5", price :"2000"},
       
        {id: 24, name : "CULTURAL & CREATIVE ART BOOK 1", price :"2700"},
        {id: 25, name : "CULTURAL & CREATIVE ART BOOK 2", price :"2700"},
        {id: 26, name : "CULTURAL & CREATIVE ART BOOK 3", price :"2700"},
        {id: 27, name : "CULTURAL & CREATIVE ART BOOK 4", price :"2700"},
        {id: 28, name : "CULTURAL & CREATIVE ART BOOK 5", price :"2700"},
        {id: 29, name : "CULTURAL & CREATIVE ART BOOK 6", price :"2700"},

        {id: 30, name : "SPELLING WORD SEARCH BOOK 1", price :"2000"},
        {id: 31, name : "SPELLING WORD SEARCH BOOK 2", price :"2000"},
        {id: 32, name : "SPELLING WORD SEARCH BOOK 3", price :"2000"},
        {id: 33, name : "SPELLING WORD SEARCH BOOK 4", price :"2000"},
        {id: 34, name : "SPELLING WORD SEARCH BOOK 5", price :"2000"},
        {id: 35, name : "SPELLING WORD SEARCH BOOK 6", price :"2000"},
        
        {id: 36, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 1", price :"2200" },
        {id: 37, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 2", price :"2200"},
        {id: 38, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 3", price :"2200"},
        {id: 39, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 4", price :"2200"},
        {id: 40, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 5", price :"2200"},
        {id: 41, name : "QUANTITATIVE REASONING FOR PRIMARY BOOK 6", price :"2200"},

        {id: 42, name : "VERBAL REASONING FOR PRIMARY BOOK 1", price :"2200"},
        {id: 43, name : "VERBAL REASONING FOR PRIMARY BOOK 2", price :"2200"},
        {id: 44, name : "VERBAL REASONING FOR PRIMARY BOOK 3", price :"2200"},
        {id: 45, name : "VERBAL REASONING FOR PRIMARY BOOK 4", price :"2200"},
        {id: 46, name : "VERBAL REASONING FOR PRIMARY BOOK 5", price :"2200"},
        {id: 47, name : "VERBAL REASONING FOR PRIMARY BOOK 6", price :"2200"}
    ]
  }
];

//set default price list
priceList = officialPrice;

const resultsContainer = document.getElementById('results');
const searchTerm = document.getElementById('searchBox'); 

function displayNoSuggestion(data) {
    if (resultsContainer) {
        resultsContainer.innerHTML = data.length < 1 ? `<p class="suggestions">NO SUGGESTIONS</p>` : "";
    }
  }
  
function checkForEmptyInputSearch() {
    try {
      if (resultsContainer) {
        resultsContainer.innerHTML = "";
      }
    } catch (error) {
      // Handle any potential errors here
      console.error(error);
      resultsContainer.innerHTML = "<p>No content available</p>";
    }
  }
  
function displayMatches(filteredData) {

    const resultsContainer = document.getElementById('results');
    // Find the category for the current book
  
    let html = filteredData.map(book => {
    const bookCategory = Object.keys(bookList.find(category => Object.values(category)[0].includes(book)));

    return `<div class="book-element">
              <div class="searchPic" style="background-image: url('bk_imgs/${book.image}');"></div>
              <div class="bookContent">
                <div class="bookName" style="padding:8px;">${book.name.toLowerCase()} </div>
                 
                <div class="bookFooter">
                  <div class="item_cost"><small><b>₦${getPrice(bookCategory, book.id)}</b></small></div>
                  <div class="details_fram">
                    <div id="minusOne" class="bi bi-dash-circle"></div>
                    <input type="number" id="itemCount" class="list cartInput" min="1" value="1" />
                    <div id="plusOne" class="bi bi-plus-circle-fill"></div>
                  </div>
                  <div class="cartBtn"> 
                        <span class="bi bi-cart-check-fill"></span>add to cart 
                  </div>
                  <div style="display: none;">
                    <span>${book.name}</span><span>${bookCategory}</span><span>${book.id}</span>
                  </div>
                </div>
                </div>
            </div>`;
    }).join('');

    // Check if dropdownContent exists before updating innerHTML
    if (resultsContainer) {
        resultsContainer.innerHTML = html;
    }
  
    if (filteredData.length === 0 && searchTerm.value.trim() !== '') {
        const messageElement = document.createElement('div');
        messageElement.textContent = 'No books found.';
        resultsContainer.appendChild(messageElement);
    }
           
    let itemCount = document.querySelectorAll('.cartInput');
 
    itemCount.forEach(individualItemCount => { 
        let bookname, cat, bkId;

        const cartBtn = individualItemCount.parentElement.nextElementSibling; 
        bookname = cartBtn.nextElementSibling.children[0].textContent;
        cat = cartBtn.nextElementSibling.children[1].textContent;
        bkId = cartBtn.nextElementSibling.children[2].textContent;

        let plus1 = individualItemCount.nextElementSibling;
        let minus1 = individualItemCount.previousElementSibling;
        let oldInput = cartBtn.previousElementSibling;
  
        plus1.onclick = () => {
            let currentValue = parseInt(individualItemCount.value) || 0;
            individualItemCount.value = currentValue + 1;
        };

        minus1.onclick = () => {
            let currentValue = parseInt(individualItemCount.value) || 0;
            if (currentValue > 0) {
                individualItemCount.value = currentValue - 1;
            }
        };
        let bookCost;
        let bkQuant = 0;
        const cartBtnClickHandler = (e) => { 
             
            
            bkQuant = bkQuant ? bkQuant : individualItemCount.value;
            bookCost = getPrice(`${cat}`, Number(bkId));
            toCart(bookname.toLowerCase(), bkQuant, bookCost, cat, bkId);
            cartBtn.disabled = true;
            cartBtn.style.backgroundColor = 'rgb(240, 240, 240)';
  
            cartBtn.innerHTML = ` Book added`; 
            oldInput.innerHTML = `<span class="bi-x-circle-fill" style=" padding: 4px 6px 3px; border-radius:5px; color: white; background-color: red;"></span>
                                  <input type="text" style="width: 90%; padding-left: 10px; background:rgb(240, 240, 240) " class="list cartInput" disabled value="${bkQuant}" /> 
                                  <span class="bi bi-pencil-fill nxt-btn" style="margin-left: 5px; padding: 4px 6px 2px; border-radius:5px;"></span>`;
             
            let flotItem; let cartList = document.getElementById('cart');

            flotItem = document.querySelector('.listNum');
            if(flotItem){
                flotItem.innerHTML = `${cartItemsAry.length}`;
            }else{
                flotItem = document.createElement('div');
                flotItem.innerHTML = `${cartItemsAry.length}`;
                flotItem.classList.add('listNum');
            }

            cartList.appendChild(flotItem);

            let idet = oldInput.children[2];
            let dilet = oldInput.children[0];

            idet.onclick = () =>{editTab()}
            dilet.onclick = () =>{showConfirm()}
            // Remove the event listener after the first click
            cartBtn.removeEventListener('click', cartBtnClickHandler);
    
            let cart = document.getElementById('cart');
            const parentElement = cart.parentNode;
        
            if(parentElement){ 
                [...parentElement.children].forEach(c => c.classList.remove('navicons'));
                cart.classList.add('navicons');  
            }
    
        };
                
        const editTab =()=>{ 
            
            oldInput.innerHTML = `
                <div id="minusOne" class="bi bi-dash-circle"></div>
                <input type="number" id="itemCount" class="list cartInput" min="1" value="${bkQuant}" />
                <div id="plusOne" class="bi bi-plus-circle-fill"></div> 
            `;
            cartBtn.style.backgroundColor = 'aqua';
            cartBtn.innerHTML = `<span class="bi bi-cart-check-fill"></span>add to cart`;
            const secondChildElement = oldInput.children[1];
            
            console.log(bkQuant);
            bookname = cartBtn.nextElementSibling.children[0].textContent;
            cat = cartBtn.nextElementSibling.children[1].textContent;
            bkId = cartBtn.nextElementSibling.children[2].textContent;
    
            let plus1 = secondChildElement.nextElementSibling;
            let minus1 = secondChildElement.previousElementSibling;
            plus1.onclick = () => {
                let currentValue = parseInt(secondChildElement.value) || 0;
                secondChildElement.value = currentValue + 1;
                bkQuant = secondChildElement.value;
            };
    
            minus1.onclick = () => {
                let currentValue = parseInt(secondChildElement.value) || 0;
                if (currentValue > 0) {
                    secondChildElement.value = currentValue - 1;
                    bkQuant = secondChildElement.value;
                }
            };

            secondChildElement.addEventListener('change', () => {
                bkQuant = secondChildElement.value;
            });

            cartBtn.addEventListener('click', cartBtnClickHandler);

        }
  
        cartBtn.addEventListener('click', cartBtnClickHandler);      
    });
}

async function  searchBook() {
    if (searchTerm.value !== " ") {
    const resultsContainer = document.getElementById('results');
    const introPic = document.getElementById('introPic');
    let bkGala = document.querySelector('.hm-content');
      // Display the filtered books or a message if none found

        if (searchTerm.value === '') {
            resultsContainer.innerHTML = '';
            if(introPic){
                introPic.style.display = 'block';
            }else{
                bkGala.style.display = 'block';
            }
            return;
        } else {
            if(introPic){
               introPic.style.display = 'none'; 
            }else{
                bkGala.style.display = 'none';
            }
            
        }
      // Flatten the nested array structure
      const namesData = bookList.flatMap(category => Object.values(category)[0]);
        //console.log(searchTerm);
      let filteredData = namesData.filter(data => {
            let names = data.name.toLowerCase();
            let searchedName = searchTerm.value.toLowerCase();
            if(searchedName !== ""){
                return names.includes(searchedName);
            }
           
        });
        
        displayMatches(filteredData);
    } else {
        checkForEmptyInputSearch();
    }
}
  
const getPrice = (sch, bkId) => {
   
    for (const bookClass of priceList) {
        if (bookClass.hasOwnProperty(sch)) { 
        const books = bookClass[sch];
            for (const book of books) {
                if (book.id === bkId) {
                return Number(book.price);
                }
            }
        }
    }
    return 0; // Return 0 if the book is not found
};

const getBookInfo = (bookName) => {
  // Iterate over the categories in the priceList
  for (const category of priceList) {
    const categoryName = Object.keys(category)[0];
    const books = category[categoryName];
    
    // Iterate over the books in the current category
    for (const book of books) {
      if (book.name.toLowerCase() === bookName) {
        book_id = Number(book.id);
        book_class = categoryName; 
        return [book_id, book_class]; // Exit the function after finding the book
      }
    }
  }

  // If the book is not found, log a message
  console.log(`Book "${bookName}" not found in the price list.`);
};

const hide = (pg) =>{
    if(pg <= 0){
        return style="display: none";
    } 
}

const eachBooks = document.querySelectorAll('.bookbox'); 

const check4Val = (bk) =>{
    let isPresent = false;

        //loop through array of books
        for(let i=0; i<cartItemsAry.length; i++){
            //check if data is object
            if((typeof cartItemsAry[i]) === 'object'){
                if(cartItemsAry[i].book === bk){
                    isPresent = true;
                }
            }
        };

            if(isPresent === true){
                for(let i=0; i<cartItemsAry.length; i++){
                    //check if loop data is object
                    if((typeof cartItemsAry[i]) === 'object'){
                        if(cartItemsAry[i].book === bk){
                            //update the value 
                            bkVal = cartItemsAry[i].qnt;
                            console.log(bkVal);
                            return bkVal;
                        } 
                    }
                }
            }
            else if(isPresent === false){
                bkVal = 15;
            }
}
    
const toCart = (t, q, p, s, id) =>{
    let cartObj = {};
    let isPresent = false;

    cartObj.book = t; cartObj.qnt = Number(q); cartObj.price = Number(p);
    cartObj.bk_sch = s; cartObj.b_id = Number(id);

    //loop through array of books
    for(let i=0; i<invoiceItemsAry.length; i++){
        //check if data is object
        if((typeof invoiceItemsAry[i]) === 'object'){
            if(invoiceItemsAry[i].book === t){
                isPresent = true;
            }
        }
    };

        if(isPresent === true){
        for(let i=0; i<invoiceItemsAry.length; i++){
            //check if loop data is object
            if((typeof invoiceItemsAry[i]) === 'object'){
                if(invoiceItemsAry[i].book === t){
                    //update the value
                    invoiceItemsAry[i].book = t;
                    invoiceItemsAry[i].qnt = q;
                } 
            }
        }
        }
        else if(isPresent === false){
        //add new book to array
        invoiceItemsAry.push(cartObj);
        }
         
}

const toRequestCart = (t, q, p, s, id) =>{
    let cartObj = {};
    let isPresent = false;

    cartObj.book = t; cartObj.qnt = Number(q); cartObj.price = Number(p);
    cartObj.bk_sch = s; cartObj.b_id = Number(id);

    //loop through array of books
    for(let i=0; i<cartItemsAry.length; i++){
        //check if data is object
        if((typeof cartItemsAry[i]) === 'object'){
            if(cartItemsAry[i].book === t){
                isPresent = true;
            }
        }
    };

        if(isPresent === true){
        for(let i=0; i<cartItemsAry.length; i++){
            //check if loop data is object
            if((typeof cartItemsAry[i]) === 'object'){
                if(cartItemsAry[i].book === t){
                    //update the value
                    cartItemsAry[i].book = t;
                    cartItemsAry[i].qnt = q;
                } 
            }
        }
        }
        else if(isPresent === false){
        //add new book to array
        cartItemsAry.push(cartObj);
        }
         
}


const pickBook = (id, sch) => {

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = ''; 
    
    const createBookElement = (id, sch) => {

        for (const bookClass of bookList) {
            if (bookClass.hasOwnProperty(sch)) {
            const books = bookClass[sch];
                for (const book of books) { 
                    if (book.id === id) { 
                        let bookElement = document.createElement('div');
                        bookElement.className = 'book-element';
                        bookElement.innerHTML = `
                            <div class="bookPic" style="background-image: url('bk_imgs/${book.image}');"></div>
                            <div class="bookContent">
                                <div class="bookName">${book.name.toLowerCase()}</div>
                                <div class="description"> ${book.info}</div>
                                <div class="bookFooter">
                                    <div class="item_cost">₦${getPrice(sch, id)}</div>
                                    <div class="details_fram">
                                        <div id="minusOne" class="bi bi-dash-circle"></div>
                                        <input type="number" id="itemCount" class="list cartInput" min="1" value="${check4Val(book.name.toLowerCase()) ? bkVal : 1}" />
                                        <div id="plusOne" class="bi bi-plus-circle-fill"></div>
                                    </div>
                                    <div class="cartBtn"> 
                                        <span class="bi bi-cart-check-fill"></span> 
                                        add to cart
                                    </div>
                                </div>
                            </div>
                        `;

                        const cartBtn = bookElement.querySelector('.cartBtn'); 
                        const itemCountEl = bookElement.querySelector('#itemCount');
            
                        const cartBtnClickHandler = (e) => { 
                            toCart(book.name.toLowerCase(), itemCountEl.value, getPrice(sch, id), sch, id);
                            itemCountEl.disabled = true;

                            let cartList = document.getElementById('cart');
                            let flotItem;
                
                            flotItem = document.querySelector('.listNum');
                            if(flotItem){
                                flotItem.innerHTML = `${invoiceItemsAry.length}`;
                            }else{
                                flotItem = document.createElement('div');
                                flotItem.innerHTML = `${cartItemsAry.length}`;
                                flotItem.classList.add('listNum');
                            }
                            let cartBtn = document.getElementById('cart');
                            const parentElement = cartBtn.parentNode;
                        
                            if(parentElement){ 
                                [...parentElement.children].forEach(c => c.classList.remove('navicons'));
                                cartBtn.classList.add('navicons');  
                            }
                            cartList.appendChild(flotItem);
                 
                            // Remove the event listener after the first click
                            cartBtn.removeEventListener('click', cartBtnClickHandler);
                            setTimeout(() => {
                                if(oldPop){
                                    oldPop.style.display = 'none'; 
                                    oldPop.innerHtml = '';
                                    if(showingCart === true){add_invoice();};
                                }
                            }, 500);
                        };
                        cartBtn.addEventListener('click', cartBtnClickHandler);
                        
                        return bookElement;
                    }
                }
            }
        }
    }

    pop_up.appendChild(createBookElement(id, sch));
    let itemCount = document.getElementById('itemCount');
    let plus1 = document.getElementById('plusOne');
    let minus1 = document.getElementById('minusOne');

    plus1.onclick = () =>{ itemCount.value++ ; }
    minus1.onclick = () =>{ if(itemCount.value > 1){ itemCount.value-- ; } }

    pop_up.parentElement.style.display = 'block';

} 

const more = () => {    
    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `
    <div class="list" >
        <div> <span style="margin-left: 10px ;"> <i class="bi bi-tools"></i></span> <span>settings</span></div> <div></div>
    </div>
    <div class="list" onclick="supplyChart()">
        <div> <span style="margin-left: 10px ;"> <i class="bi bi-bar-chart-line-fill"></i></span> <span>supply analysis</span></div> <div></div>
    </div>
    <div class="list" onclick="waybillChart()">
        <div> <span style="margin-left: 10px ;"> <i class="bi bi-diagram-3-fill"></i></span> <span>waybill chart</span></div> <div></div>
    </div> 
    <div class="list" onclick="terms()">
        <div><span style="margin-left: 10px ;"> <i class="bi bi-filetype-txt"></i></span> <span>Terms of Sales</span></div> <div></div>
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none';  

    }

const getSentOrderList = () =>{
    const savedOrders = Object.keys(localStorage);
    // Loop through each key and log the key-value pair
        
    if(savedOrders.length  !== 0){

        let invoice_table = document.createElement('table');
        invoice_table.style.cssText = `box-shadow: 0px 0px 3px #6d6d6d;`;
        let tBody = document.createElement('tbody');
        let tHead = document.createElement('tr');
        tHead.innerHTML = `
            <th>order ref</th> <th>Date</th> <th>status</th>  
        `;
        tBody.appendChild(tHead);
        savedOrders.forEach(key => {
            let row = document.createElement('tr');
            row.innerHTML = `<td style="font-weight: bold">${key}</td> <td>${hexToDate(key)}</td><td>supplied</td>`;
            row.onclick = ()=>{order(key)};
            tBody.appendChild(row);
        });
        invoice_table.appendChild(tBody);
        let tFoot = document.createElement('div');
        //tFoot.classList.add('btm_nav_box');
        tFoot.innerHTML = `
            <div class="invoice-container">
            <div class="bi bi-envelope-paper invoice-icon">
                <div>Order</div>
            </div>
                                
            <div class="span">
                <div>session: 2023/2024</div> 
            </div>
            </div>

            <div class="record-container">
            <div class="list">
                Order Record <span><select class="select-option"><option>select session...</option><option>2023/2024</option><select></span>
            </div>
            </div>

        `;
        appBody.innerHTML = ''; //clear content body
        appBody.appendChild(tFoot);
        appBody.appendChild(invoice_table);
        

    }else{
        appBody.innerHTML = '';
        appBody.innerHTML = `
        <div style="text-align: center; ">
            <div class="title_box" style="background-color: #fff;">
                <div class="bi bi-cart4" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;"> shopping cart</div>
            </div>
            <img src="figures/undraw_Diary_re_4jpc.png" width="100%" />
        
            <div style="text-transform: none;">youare yet to place any order, click on the botton below to start.</div>
                
                <div class="list cancle-btn nxt-btn" style="margin: 1rem auto; width: 50%;" onclick="window.location.assign('index.html')">
                        start shopping <div class="bi bi-cart-check-fill"></div>
                </div> 
        </div>
    `; 
    }
}

const getSuppliedOrderList = () =>{
    const savedOrders = Object.keys(localStorage);
    // Loop through each key and log the key-value pair
        
    let pop_up = document.querySelector('.pop-content');
    if(savedOrders.length  !== 0){
        pop_up.innerHTML = `        <div style="text-align: center;">
        <div style="text-align: center; ">
        <div style="margin: 1rem auto; text-align: center;">
        <h1 style="font-weight: 300;">Invoice LIst</h1>
        </div>
    `;
        savedOrders.forEach(key => {
             
            let div = document.createElement('div');
            div.classList.add('list');
            div.style.backgroundColor = "white";
            div.onclick = ()=>{order(key)};
            div.innerHTML = `<div style="font-size:small;"> <span style="margin-left: 10px ;">${hexToDate(key)}</span>: </div> <div><span style="text-align:right; font-size:small"><b>Ref id: ${key}</b></span></div>`;
            pop_up.appendChild(div);

        });
    }else{          
        
        let div = document.createElement('div'); 
        div.style.cssText = "background:white; padding:1rem 1rem 3rem; text-align: center;"; 
        div.innerHTML = `
        <div style="text-align: center;">
        <div style="text-align: center; ">
        <div style="margin: 1rem auto; text-align: center;">
        <h1 style="font-weight: 300;">Invoice</h1>
        </div>

        <div style="width: 70%; margin: 1rem auto; text-align: center; text-transform: none; font-size: smaller;">
        You have not sent an order yet, click on the button below to add items to your cart.</div>
 
        <div class="grey-btn nxt-btn" style="width: 50%; font-size: smaller;" onclick="cart()"> shopping cart </div> 
        `;
        pop_up.appendChild(div);

    }

    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none';  

}

const pwdUpdate = () =>{

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `

    <div style="font-size: larger; font-weight: bold; text-align: center; text-transform: capitalize; margin-bottom: 2rem;">change password <div style="float: right; margin-top: -6px;"></div>
    <input class="list" style="background-color: rgb(248, 248, 248); border-radius: 5px; text-align: left; color: #dadada; padding: 1.2rem; border: 1px solid #e0e0e0; width: calc(100% - 3.15rem);" placeholder="enter old password" />
    <input class="list" style="background-color: rgb(248, 248, 248); border-radius: 5px; text-align: left; color: #dadada; padding: 1.2rem; border: 1px solid #e0e0e0; width: calc(100% - 3.15rem);" placeholder="enter new password"/>
    
    <div class="" style="background-color: rgb(67, 161, 4); color: whitesmoke; border-radius: 4px; text-align: center; border: 1px solid #f8f5f521; margin: 0px 5px; padding:15px; width: calc(100% - 2.6rem); text-transform: lowercase;"> <i class="bi bi-cloud-upload"></i> update</div>
    
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const seasonChart = () =>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
        <div style="margin: 0px auto; text-align: center;">
            <h3 style="font-weight: 300;">Sales Details</h3>
        </div>
    
          <table style="line-height: 2">
            <tbody>
                <tr>
                    <td> <b class="datas">stock collected</b></td>
                    <td style="text-align: left"><span class="datas">&#8358; (invoice - returns)</span> </td>
                </tr> 
                <tr>                         
                    <td> <b class="dTags">total invoice</b></td>
                    <td style="text-align: left"><span class="datas">&#8358;(sales balance - outstanding)</small> 
                    </td>
                </tr>
                <tr> 
                    <td> <b class="datas">verified payments</b></td> 
                    <td style="text-align: left"><span class="datas">&#8358; (supply - (payment + ext.stock))</span> </td>
                </tr>
                <tr> 
                    <td> <b class="datas">company outstanding</b></td>
                    <td style="text-align: left"><span class="datas">&#8358; (from schools)</span> </td> 
                </tr>
                <tr> 
                    <td> <b class="datas">actual balance</b></td>
                    <td style="text-align: left"><span class="datas">&#8358; (school receipt)</span> </td>
                </tr>
            </tbody>
          </table>        
    `;
}

const waybillChart = () =>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
        <div style="margin: 0px auto; text-align: center;">
            <h3 style="font-weight: 300;">waybill chart</h3>
        </div> 
        `;

  const table = document.createElement('table');
  table.classList.add('analysisTable');
  table.style.cssText = `line-height: 2; display: block; overflow:auto;`;
  const tbody = document.createElement('tbody');
  const frstRow = document.createElement('tr');
  frstRow.innerHTML = `
                    <th class="textUp"> <b>Date</b></th>
                    <th class="textUp">NUMBER WORK</th>
                    <th class="textUp">STARTING MATHEMATICS 1</th>
                    <th class="textUp">STARTING MATHEMATICS 2</th>
                    <th class="textUp">STARTING MATHEMATICS 3</th>
                    
                    <th class="textUp">ALPHABET WORK</th>
                    <th class="textUp">STARTING ENGLISH 1</th>
                    <th class="textUp">STARTING ENGLISH 2</th>
                    <th class="textUp">STARTING ENGLISH 3</th>
                    <th class="textUp">SPELLING 0</th>
                    <th class="textUp">PHONICS 1</th>
                    <th class="textUp">PHONICS 2</th>
                    <th class="textUp">PHONICS 3</th>
                    <th class="textUp">COLOURING 1</th>
                    <th class="textUp">COLOURING 2</th>
                    <th class="textUp">COLOURING 3</th>
                    <th class="textUp">QUANTITATIVE NUR 1</th>
                    <th class="textUp">QUANTITATIVE NUR 2</th>
                    <th class="textUp">VERBAL NUR 1</th>
                    <th class="textUp">VERBAL NUR 2</th>
                    <th class="textUp">STANDARD MATHEMATICS 1</th>
                    <th class="textUp">STANDARD MATHEMATICS 2</th>
                    <th class="textUp">STANDARD MATHEMATICS 3</th>
                    <th class="textUp">STANDARD MATHEMATICS 4</th>
                    <th class="textUp">STANDARD MATHEMATICS 5</th>
                    <th class="textUp">STANDARD MATHEMATICS 6</th>
                    <th class="textUp">STANDARD ENGLISH 1</th>
                    <th class="textUp">STANDARD ENGLISH 2</th>
                    <th class="textUp">STANDARD ENGLISH 3</th>
                    <th class="textUp">STANDARD ENGLISH 4</th>
                    <th class="textUp">STANDARD ENGLISH 5</th>
                    <th class="textUp">STANDARD ENGLISH 6</th>

                    <th class="textUp">BASIC GRAMMAR BOOK 1</th>
                    <th class="textUp">BASIC GRAMMAR BOOK 2</th>
                    <th class="textUp">BASIC GRAMMAR BOOK 3</th>
                    <th class="textUp">BASIC GRAMMAR BOOK 4</th>
                    <th class="textUp">BASIC GRAMMAR BOOK 5</th>
                    <th class="textUp">BASIC GRAMMAR BOOK 6</th>

                    <th class="textUp">GRAMMAR MADE EASY BOOK 1</th>
                    <th class="textUp">GRAMMAR MADE EASY BOOK 2</th>
                    <th class="textUp">GRAMMAR MADE EASY BOOK 3</th>
                    <th class="textUp">GRAMMAR MADE EASY BOOK 4</th>
                    <th class="textUp">GRAMMAR MADE EASY BOOK 5</th>

                    <th class="textUp">CREATIVE ART BOOK 1</th>
                    <th class="textUp">CREATIVE ART BOOK 2</th>
                    <th class="textUp">CREATIVE ART BOOK 3</th>
                    <th class="textUp">CREATIVE ART BOOK 4</th>
                    <th class="textUp">CREATIVE ART BOOK 5</th>
                    <th class="textUp">CREATIVE ART BOOK 6</th>
                    <th class="textUp">SPELLING 1</th>
                    <th class="textUp">SPELLING 2</th>
                    <th class="textUp">SPELLING 3</th>
                    <th class="textUp">SPELLING 4</th>
                    <th class="textUp">SPELLING 5</th>
                    <th class="textUp">SPELLING 6</th>
                    <th class="textUp">QUANTITATIVE 1</th>
                    <th class="textUp">QUANTITATIVE 2</th>
                    <th class="textUp">QUANTITATIVE 3</th>
                    <th class="textUp">QUANTITATIVE 4</th>
                    <th class="textUp">QUANTITATIVE 5</th>
                    <th class="textUp">QUANTITATIVE 6</th>
                    <th class="textUp">VERBAL 1</th>
                    <th class="textUp">VERBAL 2</th>
                    <th class="textUp">VERBAL 3</th>
                    <th class="textUp">VERBAL 4</th>
                    <th class="textUp">VERBAL 5</th>
                    <th class="textUp">VERBAL 6</th>
                `;
tbody.appendChild(frstRow);

  for (let row = 0; row < 15; row++) {
    const rowElement = document.createElement('tr');
    for (let col = 1; col < 68; col++) {
      const cellElement = document.createElement('td');
      cellElement.style.lineHeight = '2';
      if(col === 1){
        cellElement.textContent = 'aug@15';
      }else{
        cellElement.textContent = '-';
      } 
      rowElement.appendChild(cellElement);
    }

    tbody.appendChild(rowElement);
  }

  table.appendChild(tbody);
  appBody.appendChild(table);

}

const supplyChart = () =>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
        <div style="margin: 0px auto; text-align: center;">
            <h3 style="font-weight: 300;">Supply Analysis</h3>
        </div> 
        `;

  const table = document.createElement('table');
  table.classList.add('analysisTable');
  table.style.cssText = `line-height: 2; display: block; overflow:auto;`;
  const tbody = document.createElement('tbody');
  const frstRow = document.createElement('tr');
  frstRow.innerHTML = `
                    <th class=""><b>S/N</b></th>
                    <th class="">School Name</th>
                    <th class="">School Address</th>
                    <th class="">Contact</th>
                    <th class="">Phone Number</th>
                    <th class="">Invoice</th>
                    <th class="">Payment</th>
                    <th class="">Outstanding</th>
                    
                `;
tbody.appendChild(frstRow);

  for (let row = 0; row < 15; row++) {
    const rowElement = document.createElement('tr');
    for (let col = 1; col < 9; col++) {
      const cellElement = document.createElement('td');
      cellElement.style.lineHeight = '2';
      if(col === 1){
        cellElement.textContent = '1';
      }else{
        cellElement.textContent = '-';
      } 
      rowElement.appendChild(cellElement);
    }

    tbody.appendChild(rowElement);
  }

  table.appendChild(tbody);
  appBody.appendChild(table);

}
 

const newPay = () =>{

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `

    <div style="font-size: larger; font-weight: bold; text-align: center; text-transform: capitalize; margin-bottom: 2rem;">Record payment<div style="float: right; margin-top: -6px;"></div>
      <div style="font-weight: 400; font-size: smaller;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; 
                    margin: 1rem auto; width: calc(100% -3.13rem); text-align: left;">
        <div>
            Amount Paid
            <input type="number" style="width:75%; background-color: white; border-radius: 5px; text-align: left; color: black; padding: 1.2rem; border: 1px solid #e0e0e0;" placeholder="amount paid" />
        </div>
        <div> 
             Date Paid: 
            <input type="date" style="width:75%; background-color: white; border-radius: 5px; text-align: left; color: black; padding: 1.2rem; border: 1px solid #e0e0e0;"/>
        </div>
      </div>
        <b>Type: </b>
        <input class="payType" type="radio" name="type"> Cheque
        <input class="payType" type="radio" name="type"> Cash
        <input class="payType" type="radio" name="type"> Transfer
       
      <div class="grey-btn nxt-btn" style="margin-top: 2rem;">record </div>
    </div>
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const getPaymentList = () =>{

    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
    <h1 style="font-weight: 300; margin: 1rem auto; text-align: center;">Sales Log</h1>
    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;"> 
         <div class="list" style="text-align: center; margin: 5px auto; font-weight: bold;">Payment Record <span><select style="background: white;"><option>select session...</option><option>2023/2024</option><select></span></div>
    </div>

    <div>
    <div style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;"> 
            <div class="list">select session: <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="add_pay()">Add</span></div>
    </div>
    <div style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">   
            <div class="list">Pending Payment: <b>₦45,000 <i class="bi bi-arrow-down-short"></i></b></div>
                <div class="dropdown-content myDropdown"> 
                    <table style="background: white; ">
                        <tbody>
                            <tr><th>Amount</th> <th>Date</th> <th>name</th> <th>type</th> </tr>
                            <tr><td style="font-weight: bold;">₦52,000 </td> <td>12/02/2023</td> <td>precious treasure</td> <td class="mid">cheque <input class="payCheck" type="checkbox" /></td></tr>
                            <tr><td style="font-weight: bold;">₦502,000</td> <td>02/03/2023</td> <td>amaka paul</td> <td class="mid">transfer <input class="payCheck" type="checkbox" /></td></tr>
                            <tr><td style="font-weight: bold;">₦301,000</td> <td>19/05/2023</td> <td>silver fountain</td> <td class="mid">cheque <input class="payCheck" type="checkbox" /></td></tr>
                            <tr><td style="font-weight: bold;">₦45,000</td> <td>24/08/2023</td> <td>chinwe okoro</td> <td class="mid">transfer <input class="payCheck" type="checkbox" /></td></tr>
                        </tbody>
                    </table>
                    <div id="payBtn" class="list" style="display: none;">Verify payment: <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="verify_pay()">yes</span></div>
                </div>
    </div>

    <div style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">   
      
            <div class="list"> Verified Payment: <b>₦502,345 </b> </div> 

        <hr style="margin:0px;"  />
        
        <hr style="margin:0px;"  />
            <div class="list">
                <div>₦502,000 </div> <div class="mid">21/01/2023<span class="bi bi-image" style="margin-left:10px;"></span><span class="bi bi-x-circle-fill" style="margin-left:10px; color: red;"></span></div>
            </div>
            <div class="dropdown-content myDropdown">
                <table style="box-shadow: 0px 0px 3px #6d6d6d;">
                    <tbody>
                        <tr><th>Amount</th> <th>Date</th> <th>name</th> <th>type</th> </tr>
                        <tr><td style="font-weight: bold">₦52,000 </td> <td>12/02/2023</td> <td>precious treasure</td> <td class="mid">cheque </td></tr>
                        <tr><td style="font-weight: bold">₦142,000</td> <td>15/03/2023</td> <td>david</td> <td class="mid">cash </td></tr>
                        <tr><td style="font-weight: bold">₦502,000</td> <td>02/03/2023</td> <td>amaka paul</td> <td class="mid">transfer </td></tr>
                        <tr><td style="font-weight: bold">₦301,000</td> <td>19/05/2023</td> <td>silver fountain</td> <td class="mid">cheque </td></tr>
                        <tr><td style="font-weight: bold">₦45,000</td> <td>24/08/2023</td> <td>chinwe okoro</td> <td class="mid">transfer </td></tr>
                    </tbody>
                </table>  
            </div>
            
            <div class="list">
                <div>₦25,000 </div> <div class="mid">02/03/2023<span class="bi bi-image" style="margin-left:10px;"></span><span class="bi bi-x-circle-fill" style="margin-left:10px; color: red;"></span> </div>
            </div>
            <div class="dropdown-content myDropdown">
                <table style="box-shadow: 0px 0px 3px #6d6d6d;">
                    <tbody>
                        <tr><th>Amount</th> <th>Date</th> <th>name</th> <th>type</th> </tr>
                        <tr><td style="font-weight: bold">₦301,000</td> <td>19/05/2023</td> <td>silver fountain</td> <td class="mid">cheque </td></tr>
                        <tr><td style="font-weight: bold">₦45,000</td> <td>24/08/2023</td> <td>chinwe okoro</td> <td class="mid">transfer </td></tr>
                    </tbody>
                </table>  
            </div>
            
            <div class="list">
                <div>₦132,000 </div> <div class="mid">15/05/2023<span class="bi bi-image" style="margin-left:10px;"></span><span class="bi bi-x-circle-fill" style="margin-left:10px; color: red;"></span> </div>
            </div>
            <div class="dropdown-content myDropdown">
                <table style="box-shadow: 0px 0px 3px #6d6d6d;">
                    <tbody>
                        <tr><th>Amount</th> <th>Date</th> <th>name</th> <th>type</th> </tr>
                        <tr><td style="font-weight: bold">₦52,000 </td> <td>12/02/2023</td> <td>precious treasure</td> <td class="mid">cheque </td></tr>
                        <tr><td style="font-weight: bold">₦142,000</td> <td>15/03/2023</td> <td>david</td> <td class="mid">cash </td></tr>
                        <tr><td style="font-weight: bold">₦502,000</td> <td>02/03/2023</td> <td>amaka paul</td> <td class="mid">transfer </td></tr>
                    </tbody>
                </table>  
            </div>
        <hr style="margin:0px;"  />
            <div class="list"> Cash: <b>₦102,345</b></div>
            <div class="list"> Cheque:<b>₦62,745</b></div>
            <div class="list"> Transfer: <b>₦400,235</b></div>

        </div>
    </div>
    `;
              
    const payboxes = document.querySelectorAll('.payCheck');
    // Get the element to show/hide
    const elementX = document.getElementById('payBtn');

    // Add a change event listener to each checkbox
    payboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() { 
            // Check if any checkbox is checked
            const isAnyChecked = Array.from(payboxes).some(function(checkbox) {
              return checkbox.checked;
            });
    
            // Show or hide the element based on the checkbox state
            elementX.style.display = isAnyChecked ? 'flex' : 'none';
          });
    });

    dropTable();
}

const checkboxes = document.querySelectorAll('.invoiceCheck');

// Add a change event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        checkbox.parentNode.style.backgroundColor = checkbox.checked ? 'aqua' : '';
    });
});

const showPrice = () => {
    appBody.innerHTML = '';
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
  let priceBox = document.createElement('div');

  priceList.forEach(category => {
  const categoryName = Object.keys(category)[0];
  const books = category[categoryName]; 
  // Create the price table
  const priceTable = document.createElement('table');
 
  (categoryName === 'nursery') ? priceTable.style.display = 'table' : priceTable.style.display = '';
  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr'); 
  const titleHeader = document.createElement('th');
  const priceHeader = document.createElement('th'); 
  titleHeader.textContent = `${categoryName} books`;
  priceHeader.textContent = 'Price'; 
  headerRow.appendChild(titleHeader);
  headerRow.appendChild(priceHeader);
  tableHead.appendChild(headerRow);
  tableHead.style.position = 'sticky';
  priceTable.appendChild(tableHead);
  
  const tableBody = document.createElement('tbody');

  // Add rows for each book
  books.forEach(book => {
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      titleCell.style.textAlign = 'left';
      const priceCell = document.createElement('td');
      priceCell.style.backgroundColor = `white`;
      titleCell.textContent = book.name.toLowerCase();
      priceCell.textContent = `₦${book.price}`;
      row.appendChild(titleCell);
      row.appendChild(priceCell);
      tableBody.appendChild(row);
  });

  priceTable.appendChild(tableBody);
  priceBox.appendChild(priceTable);
  console.log(priceTable);
  });

// Clear the content body
appBody.innerHTML = '';

// Add the header section
appBody.innerHTML = `
  <div style="box-shadow: 0px 0px 2px #c9c9c9; border-radius: 5px; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px; justify-items: center; align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); width: 80%; background-color: #fff;">
    <div class="bi bi-newspaper" style="padding: 5px 1rem; font-size: 2.2rem; margin-right: -1rem;"></div>
    <div class="span" style="font-size: large; font-weight: 300; text-align: center;">
      <div>2024 price list</div>
      <div><span style="font-size: small;">effective from May 1st, 2024</span></div>
    </div>
  </div>
`;

// Create the footer section
const footerTable = document.createElement('table');
footerTable.style.display = 'table';
const footerBody = document.createElement('tbody');
const footerRow = document.createElement('tr');
footerRow.innerHTML = `
  <td onclick="add_invoice()" style="text-align: center;"><i class="bi bi-cart4"></i> new cart</td>
  <td onclick="window.location.assign('index.html')" style="text-align: center;"><i class="bi bi-stack"></i> see books</td>
`;
footerBody.appendChild(footerRow);
footerTable.appendChild(footerBody);
appBody.appendChild(priceBox);
appBody.appendChild(footerTable);
};

 
const clearCart = () =>{
    const cartL = document.querySelector('.listNum');
        cartItemsAry = [];
        if(cartL){
            cartL.remove();
        }
        
        add_invoice();
} 

const removeBook = (indexToRemove) => {

  // If the book is found in the array
  if (indexToRemove !== -1) {
    // Remove the book from the array and store the removed book object
    cartItemsAry.splice(indexToRemove, 1);
   //reload cart
    add_invoice();
  } else {
    // Log a message indicating the book was not found in the cart
    console.log(`Book not found in cart: ${bookToRemove.title}`);
  }
}

//remove book from requisition
const delBk = (indexToRemove) => {
    // If the book is found in the array
    if (indexToRemove !== -1) {
      // Remove the book from the array and store the removed book object
      requestAry.splice(indexToRemove, 1);
     //reload cart
     listBooks();
    } else {
      // Log a message indicating the book was not found in the cart
      console.log(`Book not found in cart: ${bookToRemove.title}`);
    }
}



const cart = async ()=>{
    showingCart = true;
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
   
    if (Array.isArray(cartItemsAry) && cartItemsAry.length > 0){
        cost = 0;
 
            let cart_table = document.createElement('table');
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <th>Book title </th> <th>price</th> <th>qty</th> <th>cost</th> 
            `;
            tBody.appendChild(tHead);
            cartItemsAry.forEach(item => {
          
            let book_id  = getBookInfo(item.book)[0];
            let book_class = getBookInfo(item.book)[1];

            const indexToRemove = cartItemsAry.indexOf(item);
                let prize = getPrice(item.bk_sch, Number(item.b_id));
                //console.log(prize, item.bk_sch, Number(item.b_id));
                let row = document.createElement('tr');
                row.innerHTML = `<td style="text-align: left">${item.book}</td> 
                                <td>₦${addCommasToNumber(prize)}</td> 
                                <td onclick="pickBook(${book_id}, '${book_class}')" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${item.qnt}</td> 
                                <td onclick="removeBook(${indexToRemove})" style="box-shadow: 0px 0px 3px red inset;">₦${addCommasToNumber(prize * item.qnt)}</td>`;
                tBody.appendChild(row);
                 
                cost += Number(prize * item.qnt);
            });
            cart_table.appendChild(tBody);
            appBody.appendChild(cart_table);
    
            let sum_table = document.createElement('table');
            sum_table.style.display = 'table';
            let sumBody = document.createElement('tbody');
            let smHead = document.createElement('tr');
            smHead.innerHTML = `
                <td style="background-color: #dadada;">total cost of books:</td>
                <td>₦${addCommasToNumber(cost)}</td>
                <td style="text-align: center;"><i onclick="window.location.assign('index.html')" class="bi bi-pencil-fill"></i></td> 
            `;
            sumBody.appendChild(smHead);
            sum_table.appendChild(sumBody);
            
            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
            tFoot.innerHTML = `
                <div class="list cancle-btn" onclick="clearCart()">
                    <div style="font-size: 1rem; font-weight: bolder; margin-right: 13x;" class="bi bi-x-circle-fill"></div> cancel 
                </div>
                <div class="list proceed-btn nxt-btn" id="checkout" onclick="checkout()">checkout 
                    <div style="font-size: 1rem; font-weight: bolder;  margin-left: 13x;" class="bi bi-chevron-double-right"></div> 
                </div>
            `;
            appBody.innerHTML = ''; //clear content body
            appBody.innerHTML = `   <div class="title_box" style="background-color: #fff;">
                                        <div class="bi bi-cart4" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                                        <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">shopping cart</div>
                                    </div> 
                                    `;
            appBody.appendChild(cart_table);
            appBody.appendChild(sum_table);
            appBody.appendChild(tFoot);
    
    
    }else{
        appBody.innerHTML = '';
        requestForm();
    }
}

let selDate = "";
let requestAry = [];
let requisitionObject = {};

 
function writeMonth(mnth) {
    const monthNames = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    };
  
    if (monthNames.hasOwnProperty(mnth)) {
      return monthNames[mnth];
    } else {
      return 'Invalid month';
    }
}
  
let suppliedDate; 
let supplyChoice, supplyTime, paymentType, salesDiscount, actualPayment;
 
function wrapInSpan(str) {
  // Split the string along the colon
  const parts = str.split(':');

  // If there are at least two parts
  if (parts.length >= 2) {
    // Wrap the second part in a <span> tag
    const wrappedPart = `<span style="font-weight:bold; text-align:right;">${parts.slice(1).join(':')}</span>`;

    // Combine the first part and the wrapped second part
    return `${parts[0]}:${wrappedPart}`;
  }

  // If there's no colon or only one part, return the original string
  return str;
}

function dateToHex(date) { 
  const dateString = new Date(date)
  const millisSinceEpoch = dateString.getTime(); 
  const hexString = millisSinceEpoch.toString(16);
  return hexString;
} 

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthInWords = monthNames[month];

  const ordinalSuffix = getOrdinalSuffix(day);

  const formattedDate = `${day}${ordinalSuffix} of ${monthInWords}, ${year}`;
  return formattedDate;
}

function getOrdinalSuffix(day) {
  const lastDigit = day % 10;
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function hexToDate(hexString) {
  // Convert the hexadecimal string to a decimal number
  const decimalNumber = parseInt(hexString, 16);

  // Create a new Date object using the decimal number as the timestamp in milliseconds
  const date = new Date(decimalNumber);
    const fomated = formatDate(date);
  return fomated;
}

const errorInput = (tag) => {
    // Step 1: Select the div element to animate
    const myDiv = document.getElementById(tag);

    // Step 2: Define the CSS animation keyframes
    const animationKeyframes = `
        @keyframes insertShadowGlow {
            0% {
                box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
            }
            25% {
                box-shadow: inset 0px 0px 4px 0px red;
            }
            50% {
                box-shadow: inset 0 0 0 0 rgba(0, 0, 0, 0);
            }
            75% {
                box-shadow: inset 0px 0px 4px 0px red;
            }
            100% {
                box-shadow: inset 0px 0px 6px 0px rgba(0, 0, 0, 0);
            }
        }
    `;

    // Step 3: Apply the animation to the div element
    const style = document.createElement('style');
    style.innerHTML = animationKeyframes;
    document.head.appendChild(style);

    // Step 4: Reset the animation before applying it again
    myDiv.style.animation = 'none';
    void myDiv.offsetWidth; // Trigger a reflow to restart the animation

    myDiv.style.animation = 'insertShadowGlow 2s';
}
       
const verifyInvoice = async(ref) =>{

    // Retrieve the array from local storage 
    const storedOrder = await getAnInvoice(ref);
     
    let myOrder = [];

    if (storedOrder) {
        myOrder = JSON.parse(storedOrder); 
    } else {
        myOrder = [];
    }

    if (typeof myOrder === 'object' && myOrder !== null){
    
        cost = 0;
        
        let cart_table = document.createElement('table');
        cart_table.style.marginBottom = '0.5rem';
        cart_table.id = 'orderTable';
        let tBody = document.createElement('tbody');
        let tHead = document.createElement('tr');
        tHead.innerHTML = `
            <th>Book title </th> <th>price</th> <th >qty</th> <th>cost</th> 
        `;
        tBody.appendChild(tHead);
        //console.log(myOrder);
        myOrder.collections.forEach(item => {
            let prize = getPrice(item.bk_sch, Number(item.b_id));
            let row = document.createElement('tr');
            row.innerHTML = `<td style="text-align:left; display: flex; justify-content: space-between;">${item.book} <input class="invoiceCheck" type="checkbox" /></td> 
                            <td>₦${addCommasToNumber(prize)}</td> 
                            <td >${item.qnt}</td> 
                            <td >₦<b>${addCommasToNumber(prize * item.qnt)}</b></td>
                            `;
            tBody.appendChild(row);
            cost += prize * item.qnt;
        });
      
        cart_table.appendChild(tBody);
        appBody.appendChild(cart_table);

        let sum_table = document.createElement('table');
        sum_table.id = 'sales_info';
        sum_table.style.display = 'none';
        sum_table.style.marginBottom = '0.5rem';
        let sumBody = document.createElement('tbody'); 
        sumBody.innerHTML = `
            <tr><td><b>cost of books:</b></td><td id="bkCost">₦${addCommasToNumber(cost)}</td></tr>
            <tr>
                <td><b>discount</b></td>
                <td style="align-items: center;
                    display: grid;
                    grid-template-columns: 4fr 1fr;
                    gap: 15px;">
                    <input min="0" max="15" id="discount" type="range" /><span id="discountVal"></span>  
                </td>
            </tr>
            <tr>
                <td><b>payment:</b></td>
                <td>
                    <input id="payDay" type="date" value="" />
                </td>
            </tr>
            <tr><td><b>receiver:</b></td>
                <td>
                    <input id="receiver" type="text" value="" placeholder="receiver name..." />
                </td>
            </tr>
            <tr><td><b>contact:</b></td>
                <td>
                    <input id="receiver_phone" name="shipping" type="number" value="" placeholder="receiver phone..." /> 
                </td>
            </tr>
        `; 
        sum_table.appendChild(sumBody);
        
        let tFoot = document.createElement('div');
        tFoot.classList.add('btm_nav_box');
        tFoot.style.width = '100%';
        tFoot.innerHTML = `
            <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${ref}" style="width: fit-content; display: block;" ></div>
            <div class="list cancle-btn nxt-btn" style="width: fit-content; display: block" onclick="editDraft('${ref}')">
                <div style="font-size: x-large; color:black; font-weight: bolder;" class="bi bi-highlighter"></div> 
            </div>
            <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" id="checkout" onclick="completeInvoiceVerification('${ref}')"> 
                verify invoice <div style="font-size: large; font-weight: bolder; margin-left: 1rem" class="bi bi-patch-check-fill"></div>
            </div>
        `;
        appBody.innerHTML = ''; //clear content body
        appBody.innerHTML = `   
            <div style="box-shadow: 0px 0px 2px #c9c9c9; border-radius: 5px; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px;
                justify-items: center; align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); width: 80%; background-color: #fff;">

                <div class="bi bi-basket2" style="padding: 5px 1rem; font-size: 2.2rem; margin-right: -1rem; "></div>
                <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">Verify Invoice</div>
            </div>
            <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                <div class="invoiceTab"><small class="fb-ar">School Name: </small>      <small style="text-align: left">${myOrder.school}</small></div>
                <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left">${myOrder.address}</small></div>
                <div class="invoiceTab"><small class="fb-ar">Date: </small>      <small style="text-align: left">${myOrder.date}</small></div>
            </div>
        `;
        appBody.appendChild(cart_table);
        appBody.appendChild(sum_table); 
        appBody.appendChild(tFoot);
    }
     
    let discountRange = document.getElementById('discount');
    let costBlock = document.getElementById('bkCost');
    const payDay = document.getElementById('payDay');
    
    // Get the element to show/hide
    const elementX = document.getElementById('sales_info');
    const verifyBtn =  document.getElementById('checkout');

    const receiver = document.getElementById('receiver');
    const receiver_phone = document.getElementById('receiver_phone');
     
    // Function to check if inputs are filled and show/hide element z
    function checkInputs() {
        if (payDay.value !== '' && receiver.value !== '' && receiver_phone.value !== '') {
            verifyBtn.style.display = ''; // Show element z
        } else {
            verifyBtn.style.display = 'none'; // Hide element z
        }
    }

    // Add event listeners to inputs to trigger the check on change
    payDay.addEventListener('change', checkInputs);
    receiver.addEventListener('change', checkInputs);
    receiver_phone.addEventListener('change', checkInputs);

    // Initial check on page load
    checkInputs(); 

    disVal = document.getElementById('discountVal');

    if(disVal){
        disVal.innerHTML = discountRange.value + '%';

        discountRange.oninput = () =>{
        disVal.innerHTML = discountRange.value+'%';
        let disCal = cost * (discountRange.value / 100);
        costBlock.innerHTML = `₦${addCommasToNumber(cost - disCal)} <small style="float:right;">discount of: <b>₦${addCommasToNumber(disCal.toFixed())} </b></small>`;
        };  
    }

    // Get all checkboxes
    const checkboxes = document.querySelectorAll('.invoiceCheck'); 

    // Add a change event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            checkbox.parentNode.style.backgroundColor = checkbox.checked ? 'aqua' : '';
        });
    });

    // Function to check if all checkboxes are checked
    function areAllChecked() {
        return Array.from(checkboxes).every(checkbox => checkbox.checked);
    }

    // Add event listener to each checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Show/hide elementX based on the checkbox states
            elementX.style.display = areAllChecked() ? 'table' : 'none';
        });
    });

    if(elementX && verifyBtn){
        // Initial check on page load
        elementX.style.display = areAllChecked() ? 'table' : 'none'; 
    }

           
}

const placeOrder = () =>{
    const currentDate = new Date(); 
    const date = new Date(`${supplyTime}`);//create date object
    let discountRate = salesDiscount / (salesDiscount + actualPayment);
    console.log(discountRate);
    let orderObj = {}; 
    salesDiscount = salesDiscount === 'no discount for sales below ₦50,000' ? ' (no discount)' : ` (discounted ₦${addCommasToNumber(salesDiscount)})`;
    orderObj.orderId = 'order reference code: '+dateToHex(currentDate); 
    orderObj.shipping = 'shipping preference: '+supplyChoice;
    orderObj.shipDate = 'shipping date: '+formatDate(date);
    orderObj.payment = 'payment due date: '+paymentType;
    orderObj.rate = discountRate; 
    orderObj.payable = `total payable: ₦`+ addCommasToNumber(actualPayment) +' '+salesDiscount ;
    orderObj.orderList = cartItemsAry; 
    localStorage.setItem(dateToHex(currentDate), JSON.stringify(orderObj));

    appBody.innerHTML = ''; 
    cartItemsAry = [];
        
    appBody.innerHTML = `
    <div style="margin: 10px auto; text-align: center;">
    <h1 style="font-weight: 300;">Order Completed!</h1>
    <img src="figures/undraw_Message_sent_re_q2kl.png" width="100%" />
    
    <div style="width: 70%; margin: 1rem auto; text-align: center; text-transform: none; font-size: smaller;">
        Your order has been sent. You can track it here or in your transactions page.</div>
    
    <div onclick="order('${dateToHex(currentDate)}')" class="grey-btn nxt-btn"> track order <span class="bi bi-geo"></span></div> 
    </div>
    `;
}

const profile = () =>{ 
    appBody.innerHTML = "";
    appBody.innerHTML = `

    <div style="display: block; justify-items: center; align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); width: fit-content;">

        <img src="bk_imgs/icon.jpg" width="100px"/>
    </div>
    
    </div>
    <div style=" border-radius: 5px; display: block;
        align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); font-size: 12px;">
         
    <div style=" text-align: center; justify-content: center; font-size: large; font-weight: 500;">
        Afem Publishers Limited
    </div>

    <div style="box-shadow: 0px 0px 3px #6d6d6d; background-color:#f0f0f0;  width: 100%; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px;
            align-items: center; margin: 10px auto; font-size: 12px;">
        
        <div class="bi bi-geo-alt" style="padding: 0.5rem 0.75rem; background-color: #fff; font-size: 1.5rem; box-shadow: 0px 0px 2px #dadada; 
            border-radius: inherit; text-align: center;  margin: 1rem 10px;">
        </div>
        <div class="span" style="font-size: large; font-weight: bold; padding: 8px; padding-bottom: 12px; position: relative;"> 
            <div style=" text-transform: lowercase; text-align: start; line-height: 1.5; font-size: 14px; ">
                19, olabisi taiwo street, mosan-okunola, ipaja alimosho, lagos
            </div> 
        </div>

    </div>
 

    <div style="text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; font-size: initial;">
    <div class="list" style="text-align: center; margin: 5px auto; font-weight: bold;">Sales season  <span><select style="background: white;"><option>select session...</option><option>2023/2024</option><select></span></div>
    <hr style="margin:0px;"  />
        <div class="list"> ${wrapInSpan('sales season: 2024/2025 session')} </div>
        <hr style="margin:0px;"  />
            <div class="list"> season status: <b>ongoing</b></div>
        <hr style="margin:0px;"  />
            <div class="list"> ${wrapInSpan('Stock collected: ₦320,445')} </div>
            <div class="list"> ${wrapInSpan('Books invoiced: ₦320,445')} </div>
            <div class="list"> ${wrapInSpan('verified payment: ₦200,000')} </div>
            <div class="list"> ${wrapInSpan('current outstanding: ₦20,445')} </div>

    </div>
    
</div>


    `;    
}

const loginPage = () =>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
    
    <div style="box-shadow: 0px 0px 2px #c9c9c9; border-radius: 5px; display: block;
    justify-items: center; align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); width: fit-content;">

    <div onclick="profile()" class="bi bi-image-fill" style="padding: 5px 1rem; font-size: 3.2rem; text-align: center;">
        <div style="font-size: small; font-weight: 300;">logo</div>
    </div>
    
</div>
<div style="width: 80%;  border-radius: 5px; display: block; padding: 8px;
    align-items: center; margin: 1rem auto; margin-top: calc(1rem - 10px); font-size: 12px;">

    <div style="box-shadow: 0px 0px 4px #dfdede; background-color:#f0f0f0;  width: 100%;  border-radius: 5px; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px;
            align-items: center; margin: 1rem auto; font-size: 12px;">
        
        <div class="bi bi-person-bounding-box" style="padding: 0.5rem 0.75rem; background-color: #fff; font-size: 1.5rem; box-shadow: 0px 0px 2px #dadada; 
            border-radius: inherit; text-align: center; margin-left: 10px;">
        </div>
        <div class="span" style="font-size: large; font-weight: 300; padding: 8px; padding-bottom: 12px; position: relative;"> 
            <div style=" text-transform: lowercase; text-align: start; line-height: 1.5; font-size: 14px; ">
                welcome<br/> please signin 
            </div> 
        </div>

    </div>
<!---
    <div style="box-shadow: 0px 0px 4px #dfdede; background-color:#ffcece;  width: 100%;  border-radius: 5px; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px;
            align-items: center; margin: 1rem auto; font-size: 12px;">
        
        <div class="bi bi-exclamation-diamond" style="padding: 0.5rem 0.75rem; background-color: #ffffff9a; font-size: 1.5rem; box-shadow: 0px 0px 2px #dadada; 
            border-radius: inherit; text-align: center; margin-left: 10px;">
        </div>
        <div class="span" style="font-size: large; font-weight: 300; padding: 8px; padding-bottom: 12px; position: relative;"> 
            <div style=" text-transform: lowercase; text-align: start; line-height: 1.5; font-size: 14px; ">
                login details incorrect.<br/> please try again
            </div> 
        </div>

    </div>

    <div style="box-shadow: 0px 0px 4px #dfdede; background-color:#8fff98;  width: 100%;  border-radius: 5px; display: grid; grid-template-columns: 2fr 10fr; column-gap: 10px;
            align-items: center; margin: 1rem auto; font-size: 12px;">
        
        <div class="bi bi-check2-circle" style="padding: 0.5rem 0.75rem; background-color: #ffffffa8; font-size: 1.5rem; box-shadow: 0px 0px 2px #dadada; 
            border-radius: inherit; text-align: center; margin-left: 10px;">
        </div>
        <div class="span" style="font-size: large; font-weight: 300; padding: 8px; padding-bottom: 12px; position: relative;"> 
            <div style=" text-transform: lowercase; text-align: start; line-height: 1.5; font-size: 14px; ">
                login successful.<br/> re-directing you in 3 
            </div> 
        </div>

    </div>
----->
    <div class="bi bi-telephone" style="padding: 0.5rem 0.75rem; background-color: #fff; width: fit-content; font-size: 1.5rem;  
            border-radius: inherit; text-align: center; margin-bottom: -3.525rem; margin-left: 0.55rem;">
    </div>
    <input type="text" class="list" style="background-color:transparent; font-family: inherit; border-radius: 5px;
                margin-bottom: 1rem; text-align: left; color: #1b1b1b; padding: 1.2rem; 
                padding-left: 3.5rem; border: 1px solid #e0e0e0; width: calc(100% - 5.55rem);" placeholder="phone number" /> 
    
    <div class="bi bi-key" style="padding: 0.5rem 0.75rem; background-color: #fff; width: fit-content; font-size: 1.5rem;   
        border-radius: inherit; text-align: center; margin-bottom: -3.525rem; margin-left: 0.55rem; transform: rotate(-30deg);">
    </div>
    <input type="password" class="list" style="background-color: transparent; font-family: inherit; border-radius: 5px; 
                text-align: left; color: #1b1b1b; padding: 1.2rem; padding-left: 3.5rem; 
                border: 1px solid #e0e0e0; width: calc(100% - 5.55rem);" placeholder="password" /> 
    
    <div style="box-shadow: 0px 0px 4px #dfdede; background-color:#f0f0f0;  width: 100%;  border-radius: 5px; display: block;
            align-items: center; margin: 1rem auto; font-size: 12px;">

        <div class="span" style="font-size: large; background-color: rgb(67, 161, 4); color: whitesmoke; border-radius: inherit; font-weight: 300; padding: 1rem;position: relative;"> 
            <div style=" text-transform: lowercase; text-align: center; line-height: 1.5; font-size: 14px; font-weight: 400;">
                sign in
            </div> 
        </div>

    </div>


    
</div>

`;
}

if (oldPop) {
    oldPop.addEventListener('click', (e) => { 
        if(e.currentTarget === e.target){
            oldPop.firstElementChild.innerHTML = '';
            oldPop.style.display = 'none'; oldPop.innerHtml = '';
        }
        setlog = new Set();
        clearSel();
    });
}

const transactions = () =>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    appBody.innerHTML = '';
    appBody.innerHTML = `
            <div class="list" onclick="showPrice()">
                <div> <span style="margin-left: 10px ;"> <i class="bi bi-newspaper"></i></span> <span>price list</span></div> <div></div>
            </div>
            <div class="list" onclick="getPaymentList()">
                <div> <span style="margin-left: 10px;"> <i class="bi bi-currency-exchange"></i></span> <span>sales</span> </div> <div></div>
            </div>
            
            <div class="list">
                <div><span style="margin-left: 10px;"> <i class="bi bi-journals"></i></span> <span>waybill</span></div> <div></div>
            </div>
             
            <div class="list">
                <div> <span style="margin-left: 10px;"> <i class="bi bi-person-circle"></i></span> <span>my customers</span> </div> <div><i class="bi bi-arrow-down-short"></i></div>
            </div>
            <div class="dropdown-content myDropdown">
                <div class="breadcrumb"><i class="bi bi-person-plus"></i>create new account</div> 
                <div class="breadcrumb"><i class="bi bi-people"></i>current customers</div>  
            </div>
           
            <div class="list">
                <div><span style="margin-left: 10px"> <i class="bi bi-reply-all"></i></span> <span>returns</span> </div><div><i class="bi bi-arrow-down-short"></i></div>
            </div> 
                <div class="dropdown-content myDropdown">
                    <div class="breadcrumb"><i class="bi bi-cup-hot"></i> requested returns</div> 
                    <div class="breadcrumb"><i class="bi bi-sign-turn-left"></i>make new returns </div>  
                </div> 
            <div class="list">
                <div><span style="margin-left: 10px ;"> <i class="bi bi-basket2"></i></span> <span>requisitions</span></div> <div><i class="bi bi-arrow-down-short"></i></div>
            </div>
                <div class="dropdown-content myDropdown">
                    <div onclick="cart()" class="breadcrumb"><i class="bi bi-highlighter"></i> write a new requisition</div> 
                    <div onclick="invoice()" class="breadcrumb"><i class="bi bi-journal-text"></i> requisitions list</div> 
                 </div>
           
            <div onclick="more()" class="list" id="more" >
                <div><span style="margin-left: 10px ;"><i class="bi bi-menu-up"></i></span> more items</div>
                <div></div>
            </div>  
`;
drop(); 
} 

const rmvOldPop =()=>{
    if (oldPop) { 
        oldPop.firstElementChild.innerHTML = '';
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }  
}

 
const parentElement = document.querySelector('#footer_box');
if(parentElement){
        [...parentElement.children].forEach(child => {
        child.addEventListener('click', (e) => {
            [...parentElement.children].forEach(c => c.classList.remove('navicons'));
            e.currentTarget.classList.add('navicons');
        });
    });    
}


 const dropTable = () =>{ 
    // Select all elements with class "list" and add a single event listener at a higher level
 const listElements = document.querySelectorAll(".list");

if (listElements.length > 0) {
  const myDropdowns = document.querySelectorAll(".myDropdown");

  myDropdowns.forEach(drop => {
    drop.style.cssText = `
      background-color: #fff;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 0px;
      display: none;
      margin: 0px;
      border-top: none;
      transition: all 0.3s;
      padding: 5px;
    `;
  });

  listElements.forEach(listElement => {
    listElement.firstElementChild.addEventListener('click', (event) => {
      const targetList = event.currentTarget;

      if (!targetList) {
        return;
      }
    //   console.log(targetList);
      const nodeParent = targetList.parentElement;
    //   console.log(nodeParent);
      const nextElementSibling = nodeParent.nextElementSibling;

      if (!nextElementSibling || !nextElementSibling.classList.contains('myDropdown')) {
        console.log('No dropdown found as the next element sibling');
        return;
      }

      const dropdown = nextElementSibling;
      const previousSibling = dropdown.previousElementSibling;

      if (!previousSibling || previousSibling !== nodeParent) {
        console.log('No previous sibling element found for dropdown.');
        return;
      }

      myDropdowns.forEach(drop => {
        if (drop !== dropdown) {
          drop.style.display = "none";
        }
      });

      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });
  });
}

 
}

const verify_pay =()=>{

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `

    <div style="font-size: medium; font-weight: bold; text-align: center;  margin-bottom: 0.5rem;">Verify Payment<div style="float: right; margin-top: -6px;"></div><br/>
    <small style="font-weight: 400;">upload a picture of your receipt slip</small>
    <br/>
    <small style="text-align: left; font-weight: 400;">
        <p style="font-weight: bold; text-align: left; margin: 15px 0px 5px">Receipt date:</p>
        <input type="date" style="padding:1rem; width: 90%; margin-bottom: 1rem;" placeholder="verification date..." />
        <input type="text" style="padding:1rem; width: 90%;" readonly placeholder="receipt pic..." />
    </small>
    
      <div style="font-weight: 400; font-size: smaller;">
        <div class="bi bi-image" style="font-size: 2.1rem; margin: -3rem -45% 0px auto;  color: gray;"></div>
        <div class="bi bi-camera2" style="font-size: 2.5rem; margin: -2.9rem -80% 0px auto; color: gray;"></div>
      </div>
      
      <img src="bk_imgs/cc4.png" style="margin: 15px 5px; box-shadow: 0px 0px 3px #6d6d6d; background-size: cover; background-position: center center;"/>     

      <div class="grey-btn nxt-btn" style="margin-top: 2rem; width: 90%; font-weight: 400;">Save Payment</div>
    </div>
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const add_pay =()=>{

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `

    <div style="font-size: larger; font-weight: bold; text-align: center;  margin-bottom: 1rem;">Add Payment<div style="float: right; margin-top: -6px;"></div><br/>
      <div style="font-weight: 400; font-size: smaller;">
            <div style="margin: 1rem auto;text-align: left;">
                <div>
                    <b>Amount Paid:</b>
                    <input type="number" style="background-color: white; border-radius: 5px; text-align: left; color: black; margin: 10px auto; padding: 1.2rem; border: 1px solid #e0e0e0; width: calc(100% - 2.4rem);" placeholder="amount paid" />
                </div>
                <div> 
                    <b>Date Paid:</b> 
                    <input type="date" style=" background-color: white; border-radius: 5px; text-align: left; color: black; margin: 10px auto; padding: 1.2rem; border: 1px solid #e0e0e0; width: calc(100% - 2.4rem);"/>
                </div>
                <div> 
                    <b>Sender :</b> 
                    <input type="text" style=" background-color: white; border-radius: 5px; text-align: left; color: black; margin: 10px auto; padding: 1.2rem; border: 1px solid #e0e0e0; width: calc(100% - 2.4rem);"/>
                </div>
            </div>
        <div style="text-align: left">
            <p style="font-weight: bold">Payment Type: </p>
            <input class="payType" type="radio" name="type" value="Cheque"> Cheque
            <input class="payType" type="radio" name="type" value="Cash"> Cash
            <input class="payType" type="radio" name="type" value="Transfer"> Transfer
        </div>

      <div class="grey-btn nxt-btn" style="margin-top: 2rem;">Upload</div>
    </div>
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const terms_info = () =>{
    appBody.innerHTML = '';
    let text = document.createElement('div'); 
    text.style.cssText = `
        text-transform: none;
        padding: 0.5rem;
        line-height: 1.5;
        text-align: left;
    `;
    text.innerHTML = `
    <h3>Terms and conditions of sales 2024</h3>
    <div>
        The below terms of sales serves as a contract between you (hereafter refered to as customer(s)) and
        the sales representative (hereafter referred to as the company) in relation to the sales and/or servies offered by the company.
    </div>
<br/>
    <div>
        <b>Orders:</b>
            <p>Customers are encouraged to place their order early to facilitate efficient preparation and supply. They are also encouraged to use our Sales APP to place order as this would ensure proper documentation and tracking of order made. 
        Customers are also encouraged to ensure they vet their order properly before placing it as modifications made after the order is processed would not be possible without the permission of the company, they are encouraged to contact the company to re-enable their order for modification, and in the case where the customer notices an error in the order or makes an adjustment on supply, the customer shall be responsible for the cost of re-shipping the corrected order. In such an instance, the company would re-enable the order for modifications to allow the customer make the necessary adjustment. 
        In an event where the customer fails to cover the cost of re-shipping the adjusted order, the customer is required to request for returns of the error supply and make a fresh order for the correct books which would be supplied on a date subject to the sales rep's schedule. 
        Failure to place a returns request past the grace period as stated in the returns section [see returns section below] would incur a debt the value of the books on the customer.
        </p>
    </div>
<br/>
    <div>
    <b>Supply:</b>
        <p>
            The company ensures that all books ordered for are supplied at the date specified by the customer, but it is noteworthy that supply of books ordered is subject to the following conditions; 
        </p>
    <ul>    
        <li>	<b>Availability of stock:</b> books would only be supplied based on their availability as at the time the order is processed.
        <li>	Supply of order valued at ₦50,000 and below would only be made with payment of at least 75% of its cost on delivery.
        <li>	<b>Public holidays and weekends:</b> books would not be supplied during public holidays and weekends except agreed upon by the company and the customer.
        <li>	<b>Customer's reputation:</b> the company reserves the right to not honor the order or delay the supply of customers deemed to have a bad reputation or history with the company
        <li>	<b>Payment outstanding of customers:</b> customer with outstanding payments would not be supplied books ordered for until the outstanding is cleared
        <li>	<b>Sales efficiency by the company's analysis:</b> the company reserves the right to adjust the quantity of books supplied to the customers as deemed fit which may not reflect the quantity ordered for by the customer  
        <li>	All subsequent supply made after the initial supply during the supply period, would only be supplied with payment on delivery.
    </ul>
        Our customers are requested to permit a lateness in supply of at least 3 working day post the specified date, before a formal complaint is raised to accommodate unforeseen circumstances.
    </div>
<br/>
    <div>
    <b>Discount & bonuses:</b> 
            <p>In appreciation to customers who are either new buyers or seasoned patrons of our company, we occasionally offer discounts on purchases made. However, it should be noted that these discounts on purchases are NOT an entitlement to customers and the value of the discount when applicable varies depending on the terms of purchase.
        For better clarity, discounts when available, are subject to the terms below;</p> 
        <b>a.</b> 	All purchases valued at ₦50,000 and below (henceforth referred to as PB-50) are not eligible for any discount except in special conditions [see terms (e)].
        <br/> <b>b.</b> 	Purchases above ₦50,000 (henceforth referred to as PA-50) are eligible for a discount not more than 10% of the total cost of the books if full payment would be made on delivery of the books.
        <br/> <b>c.</b> 	PA-50 are eligible for a discount of 8% if payment would be made at a date different from the date of supply.
        <br/> <b>d.</b> 	In a situation where PA-50 is made and part-payment is made on supply when the date option is selected when placing an order, customers would be eligible for a 2% extra discount bonus on next purchase if balance payment is made no later than 7 days after the first payment.
    <br/> <b>e.</b> All purchase made (including PB-50) with the pick-up option chosen (in which the customer chooses to pick-up the books at out head office) when placing an order, are eligible for a discount not more than 12% of the cost of purchase. It is noteworthy that payments would be made before any book can be received at the head office.
    </div>
<br/>
    <div>
    <b>Payment:</b>
        <p>
            Payments can be made by cash, cheque or transfer. Evidence of payment must be made available to the company if transfer is made to enable the payment to reflect in the customer's account. Customers are encouraged to make payments either in full or in parts on delivery of books to enjoy higher discounts and bonuses. We also encourage customers who choose a separate date for payment to make full payments or make returns on or before the stipulated date to better company-customer relationship, customer reputation and prevent late returns fees or debts.
        </p>
    </div>
<br/>
    <div>
    <b>Debt:</b>
    <p>
        The company strongly frowns against customer debts as it affects the cost of operation and production of the company and it reserves the right to use any and every possible precautionary method to prevent customers from being indebted. In cases where debts are still incurred by the customers irrespective of the methods put in place to prevent them, the company reserves the right to use every legal method to recover the debts, and customers with history of debts would be placed on the company's watch-list which would badly affects the company-customer relationship and the reputation of the customer to the company.
    </p>
    </div>
<br/>
    <div>
    <b>Grievances:</b>
        <p>
            Any and every grievances or complaints concerning the company, books or the company services should first be relayed to the company and allowed a grace of 10 work-days for proper response before any legal action is taken. Any complaint not formally relayed to the company may not be attended to, except in cases where the company is unreachable or unresponsive over the grace period.
        </p>
    </div>
<br/>
    <div>
    <b>Returns:</b> 
        <p>
            Our customers are opened to the opportunity to return books not sold within a specified period to accommodate for changes in the purchasing power and habits of parents. However, this opportunity is subject to the following terms; 
        </p>
            <ul>
                <li>	Books already paid for are NOT eligible for returns as the company does NOT make refunds of payment received.
                <li>	Books mutilated under the customer's possession are NOT eligible for returns.
                <li>	Books which pass the above terms are eligible for returns if returns is requested within 3 weeks of supply.
                <li>	Books returned within 4 to 6 weeks would incur a late returns fee of 12% of the value supplied to account for loses on the company's side as a result of the customer's hording of the books.
                <li>	Books not returned or paid for after 6 weeks would no longer be eligible for returns and would be considered a debt on the customer, and the affected customer permits the company to use every legal option to recover the debt.
            </ul>
    </div>
    `;
    appBody.appendChild(text);
}

let currentDate = '';
let ref_code = '';
let setItem;



const invoiceList = async () =>{

    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    const myInvoices = await getInvoiceList(); 
     
      try{
        if(myInvoices.length  !== 0){
            let invoice_table = document.createElement('table');
            invoice_table.style.cssText = `box-shadow: 0px 0px 3px #6d6d6d;`;
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <tr><th>school</th> <th>Date</th> <th>ref. Id</th> <th>status</th> </tr>  
            `;
            tBody.appendChild(tHead);

            let school = '', invoice_date = '', invoice_status = '', invoice_ref = '';

            myInvoices.forEach(key => {
                console.log('Invoices:', key);
            
                if (typeof key === 'object' && key !== null){
                    
                    invoice_date = key.date;
                    school = key.school;
                    invoice_status = key.status;
                    invoice_ref = key.ref;

                    let fwd, bck = '';

                    let row = document.createElement('tr');
                    switch (invoice_status) {
                        case 'verified':
                            row.onclick = ()=>{ displayInvoice(key.ref) };
                            bck = '#00ffff61';
                            break;
                        case 'saved':
                            row.onclick = ()=>{verifyInvoice(key.ref) };
                            bck = '#ffff0069';
                            break;
                    
                        default:
                            row.onclick = ()=>{ editDraft(key.ref) };
                            break;
                    }
                    row.innerHTML = `<td style="font-weight: bold;">${school}</td> <td style="text-align: left;">${invoice_date}</td> <td>${invoice_ref.toUpperCase()}</td> <td style="background-color:${bck};">${invoice_status}</td>`;
 
                    tBody.appendChild(row);
                }
                
            });
            invoice_table.appendChild(tBody);
            
              appBody.innerHTML = `
                <h1 style="font-weight: 300; margin: 1rem auto; text-align: center;">Invoice</h1>
                <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;"> 
                    <div class="list" style="text-align: center; margin: 5px auto; font-weight: bold;">select session <span><select style="background: white;"><option>select session...</option><option>2023/2024</option><select></span></div>
                </div>

                <div>
                <div style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;"> 
                        <div class="list">write new invoice: <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="add_invoice()">Add</span></div>
                </div>
            `;
            appBody.appendChild(invoice_table);
             
        }
        else{
            
            appBody.innerHTML = '';
            if(oldPop){
                oldPop.style.display = 'none'; oldPop.innerHtml = '';
            }
            appBody.innerHTML = `
                <div style="margin: 10px auto; text-align: center;">
                    <h1 style="font-weight: 300;">Invoice Book</h1>
                    <img src="figures/undraw_Personal_notebook_re_d7dc.png" width="100%" />
                    
                    <div style="width: 70%; margin: 1rem auto; text-align: center; text-transform: none; font-size: smaller;">
                        your invoice book is empty, write a new invoice to get started.</div>
            
                    <div class="grey-btn nxt-btn" onclick="add_invoice()"> write new invoice </div> 
            
                </div>
            `;   
        }        
      }
      catch(err){
        console.error('Error reading data:', err.message || err);
      }

}

const displayInvoice = async(ref)=>{
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
    // Retrieve the array from storage 
    const storedOrder = await getAnInvoice(ref);
     
    let myOrder = [];
    if (storedOrder) {
        myOrder = JSON.parse(storedOrder);
        //myOrder = storedOrder;
    } else {
        myOrder = [];
    }
     
    if (typeof myOrder === 'object' && myOrder !== null){
        cost = 0;
            let cart_table = document.createElement('table');
            cart_table.style.cssText = `box-shadow: 0px 0px 3px #6d6d6d;`;
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <th>Book title </th> <th>price</th> <th >qty</th> <th>cost</th> 
            `;
            tBody.appendChild(tHead);
            //console.log(myOrder.collections);
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
            let nav = document.createElement('div');
            nav.classList.add('btm_nav_box');
            nav.innerHTML = `
                <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${myOrder.ref}" style="width: fit-content; display: block;" ></div>
                <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" name="shareBtn" id="${myOrder.ref}"> 
                    share invoice <div style="font-size: large; font-weight: bolder; margin-left: 1rem; font-size: 1.5rem" class="bi bi-skip-end-btn-fill"></div>
                </div>
            `;
            let adNote = document.createElement('div');
            adNote.style.cssText = `margin: 0.5rem auto; text-align: center;`; 
            adNote.innerHTML =`
                <div style="display: grid; grid-template-columns: 1fr 0fr 1fr; gap: 10px; align-items: center;"> 
                    <small style="text-align: right;">current Pricelist: </small>
                    <label class="switch"><input id="togglePrice" type="checkbox" ${checkStat}><span class="slider round"></span></label>
                    <small style="text-align: left;"> <b>${priceLabel}</b></small>
                </div> 
                <small style="text-align: center; text-transform: lowercase; margin: 1.5rem auto"> watch an ad to enable sharing </small>

            `;                                 
 
            appBody.appendChild(cart_table);
            appBody.appendChild(sum_table);
            appBody.appendChild(adNote);
            appBody.appendChild(nav);
            

            //appBody.appendChild(tFoot);
            
            const checkboxes = document.querySelectorAll('.invoiceCheck');

            // Add a change event listener to each checkbox
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    checkbox.parentNode.style.backgroundColor = checkbox.checked ? 'aqua' : '';
                });
            });
    }
    else{
        appBody.innerHTML = '';
        appBody.innerHTML = `

        <div class="title_box" style="background-color: #fff;">
            <div class="bi bi-cart4" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
            <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">order</div>
        </div>
        <img src="figures/undraw_refreshing_beverage_td3r.png" width="100%" />
    
        <div style="text-transform: none;">an error occured while fetching that order</div>
            
            <div class="list cancle-btn nxt-btn" style="margin: 1rem auto; width: 50%;" onclick="window.location.assign('index.html')">
                    transactions <div class="bi bi-cart-check-fill"></div>
            </div> 
    </div>
    `; 
    }

    const priceTag = document.getElementById('togglePrice');
         
    if (priceTag && priceLabel) {
        priceTag.addEventListener('change', () => {
            const isCustom = priceTag.checked;
            isCustom ? checkStat = 'checked' : checkStat = 'official pricelist';

            isCustom ? priceLabel = 'custom pricelist' : priceLabel = 'official pricelist';
            priceList = isCustom ? customPrice : officialPrice;
            
            setTimeout(() => {
                displayInvoice(ref);
            }, 500);
            
        });
    }    
}

function clearSel() {
    const titleCat = document.querySelectorAll('.squ_bx');
        if(titleCat){
        titleCat.forEach(el =>{
            el.classList.remove('bx_sel');
        })  
    }
}

const add_invoice = () =>{
    let draftCode = '';
    setlog = new Set();
    showingCart = true;
    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }
   appBody.innerHTML = '';

    if (Array.isArray(invoiceItemsAry) && invoiceItemsAry.length > 0){
        cost = 0;
            let list_ref = requisitionObject.ref;
            let cart_table = document.createElement('table');
            cart_table.id = 'title_list';
            cart_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <th>Book title </th> <th>price</th> <th>qty</th> <th>cost</th> 
            `;
            tBody.appendChild(tHead);
            invoiceItemsAry.forEach(item => {
          
            let book_id  = getBookInfo(item.book)[0];
            let book_class = getBookInfo(item.book)[1];

            const indexToRemove = invoiceItemsAry.indexOf(item);
                let prize = getPrice(item.bk_sch, Number(item.b_id));
                
                let row = document.createElement('tr');
                row.innerHTML = `<td style="text-align: left">${item.book}</td> 
                                <td>₦${addCommasToNumber(prize)}</td> 
                                <td onclick="pickBook(${book_id}, '${book_class}')" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${item.qnt}</td> 
                                <td class="ibl" id="${indexToRemove}" style="box-shadow: 0px 0px 3px red inset;">₦${addCommasToNumber(prize * item.qnt)}</td>`;
                tBody.appendChild(row);
                 
                cost += Number(prize * item.qnt);
            });
            cart_table.appendChild(tBody);
            
            let sum_table = document.createElement('table');
            sum_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let sumBody = document.createElement('tbody'); 
            sumBody.innerHTML = `
                <tr><td>cost of books:</td><td id="bkCost">₦${addCommasToNumber(cost)}</td></tr>
            `; 
            sum_table.appendChild(sumBody);

            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
            tFoot.innerHTML = `
                <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${list_ref}" style="width: fit-content; display: block;" ></div>
                <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" id="checkout" onclick="saveInvoice('${list_ref}')"> 
                    save   <div style="font-size: large; font-weight: bolder; margin-left: 1rem" class="bi bi-save-fill"></div>
                </div>
            `;
             appBody.innerHTML = `   
                <div class="title_box" style="background-color: #fff;">
                    <div class="bi bi-receipt" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                    <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">New Invoice</div>
                </div> 

                    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                        <div class="invoiceTab"><small class="fb-ar">School: </small>      <small style="text-align: left">${in_school}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left">${in_address}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Date: </small>      <small style="text-align: left">${selDate}</small></div>
                    </div> 

                        <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: small; text-align: left; margin: 1rem auto; font-weight: 500; text-transform: lowercase;" >
                            <span style="font-size: medium; font-weight: 500;">click on:</span>
                          
                            <span style="display:flex; align-items: center;"><i class="bi bi-trash3-fill" style="color: gray;"></i> to delete invoice</span>
                            <span style="display:flex; align-items: center;"><i class="bi bi-square " style="color: gray;"></i> to add books</span>
                            <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: blue;"></i> to change qty</span> 
                            <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: red;"></i> to remove book</span>                             
                        </span>

                      <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                        <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                        <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                        <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                        
                      </div>
                      <select id="book" style="width: 100%;  display:none" name="book" required></select>
                      <input id="quantity" style="width: 50px; padding: 1rem; display:none" type="number" placeholder="0" />
                  </div> 
            `;
            let adNote = document.createElement('div');
            adNote.style.cssText = `margin: 1rem auto; text-align: center;`; 
            adNote.innerHTML =`
                <div style="display: grid; grid-template-columns: 1fr 0fr 1fr; gap: 10px; align-items: center;"> 
                    <small style="text-align: right;">current Pricelist: </small>
                    <label class="switch"><input id="togglePrice" type="checkbox" ${checkStat}><span class="slider round"></span></label>
                    <small style="text-align: left;"> <b>${priceLabel}</b></small>
                </div> 
            `;          
            appBody.appendChild(cart_table);
            appBody.appendChild(sum_table);
            appBody.appendChild(adNote);
            appBody.appendChild(tFoot);
    
    }
    else{
        appBody.innerHTML = '';
     
        let reqDiv = document.createElement('div');
        reqDiv.setAttribute('id', 'reqDiv');
        //reqDiv.setAttribute('class', 'tab row');
        reqDiv.innerHTML = `
          <div style="margin: 10px auto; text-align: center;">
              <h1 style="font-weight: 300;">New Invoice</h1>
  
              <span id="introBlock">
              <div id="reqTitle">
                  <div class="bi bi-calendar2-event" style="margin-bottom:1rem;" > 
                      <span style="font-size: small; vertical-align: middle;" >fill the form below to start</span> 
                  </div> 
              </div>

                <input style="width: 90%; padding: 1rem; margin-bottom: 5px;" id="schoolName" type="text" placeholder="school name" />
                
                <!-- hidden dropdown begin -->
                <div class="search_results" id="search-results"> 
                    <div class="dropdown-content-sm sbld" id="dropdown-content">
                        <div style="border-bottom: 1px solid #ccc; padding: 10px; line-height: 1.5; margin-bottom: 5px; cursor: pointer;">
                            <div style="font-weight: lighter;"><span style="font-weight: bolder;">School saved name</span></div> 
                            <div style="font-weight: lighter;">Current Address</div>  
                            <div style="font-weight: lighter;">contact person</div> 
                        </div>
                        <div style="border-bottom: 1px solid #ccc; padding: 10px; line-height: 1.5; cursor: pointer;">
                            <div style="font-weight: lighter;"><span style="font-weight: bolder;">Full Blood Count:</span> 1145</div> 
                            <div style="font-weight: lighter;"><span class=" ">Lab Adopted Parameter Range:</span> </div>  
                            <div style="font-weight: lighter;"><span class=" ">LONIC Parameter Name:</span> </div> 
                        </div>
                    </div>   
                </div>

                <input style="width: 90%; padding: 1rem; margin-bottom: 5px;" id="address" type="text" placeholder="school address"/>
                <input style="width: 90%; padding: 1rem; margin-bottom: 5px;" id="requestDate" type="date" />
              </span>

              <form>
                  <div id="requestData" style="display: none;">
                    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                        <div class="invoiceTab"><small class="fb-ar">School Name: </small>      <small style="text-align: left" id="scName"></small></div>
                        <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left" id="scLoca"></small></div>
                        <div class="invoiceTab"><small class="fb-ar">Date: </small>      <small style="text-align: left" id="cDate"></small></div>
                    </div> 
                    <span style="display:grid; grid-template-columns: 1fr 3fr 1fr; align-items: center; justify-content: center;margin:0.5rem auto; font-size: small; margin: 1rem auto; font-weight: 500;" >
                        <small></small>
                         pick a book title  
                        <small></small>
                    </span>
                      <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                        <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                        <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                        <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                      </div>
                      <select id="book" style="width: 100%;  display:none" name="book" required></select>
                      <input id="quantity" style="width: 50px; padding: 1rem; display:none" type="number" placeholder="0" />
                  </div>
                   
             </form>
    
          </div>     
      `;
      
      appBody.appendChild(reqDiv);    
    }
   
    $(function(){
        $('#requestDate').change(function(e){ 
            e.preventDefault();
            requisitionObject = {};
            in_school = $('#schoolName').val().trim();
            in_address = $('#address').val().trim();

            document.getElementById('scName').innerHTML = in_school;
            document.getElementById('scLoca').innerHTML = in_address;
   
            let verify = "draft"; 
            let rqstDate = new Date($('#requestDate').val());
            let date = new Date($('#requestDate').val());
            
            currentDate  = date.toISOString().split('T')[0];
           
            let day = rqstDate.getDate();
            let month = rqstDate.getMonth() + 1;
            let year = rqstDate.getFullYear();

            selDate = writeMonth(month)+' '+ day +', '+ year;
            document.getElementById('cDate').innerHTML = selDate;

            //add season to invoice array
            requisitionObject.season = '2023/2024';
            //add date to invoice array
            requisitionObject.date = selDate; 
            //add school name to invoice array
            requisitionObject.school = in_school;
            //add address to invoice array
            requisitionObject.address = in_address;
            //add verification status
            requisitionObject.status = verify;
           
            $('#requestData').show();
            $('#introBlock').hide();
            $('#requestDate').attr('readonly', true);
              
            let code = '';
            let bkCdAry = in_school.split(' ');
            for(let wrd of bkCdAry){
              code += wrd.charAt(0);
            }
             //code + 
            let nCode =  Math.floor(new Date().getTime() / 1000).toString(16);

            //create a refId for the invoice
            requisitionObject.ref = nCode;
            //save ref code
            ref_code = nCode;
            draftCode = nCode;
            
            //update invoice collections
            requisitionObject.collections = invoiceItemsAry;
            //draft is new, create draft
            saveInvoiceDraft(ref_code);
            
            }); 
    }); 

    const titleCat = document.querySelectorAll('.squ_bx');

    function hasClass(element, className) {
        // Check if the element has the specified class using the classList API
        return element.classList.contains(className);
    }

    // set clicked btn to active
    titleCat.forEach(bukBox => {
        bukBox.addEventListener('click', () => {
            bukBox.classList.toggle('bx_sel');
            console.log(ref_code);
            searchInvoiceList(bukBox.id, ref_code);
        });

    });

    // Get all input elements on the page
    const inputElements = Array.from(document.querySelectorAll('input'));

    // Add event listener to each input element
    inputElements.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
            // Check if the pressed key is Enter
            if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of the Enter key

            // Move focus to the next input element
            const nextIndex = (index + 1) % inputElements.length;
            inputElements[nextIndex].focus();
            }
        });
    });

    const priceTag = document.getElementById('togglePrice');
         
    if (priceTag && priceLabel) {
        priceTag.addEventListener('change', () => {
            const isCustom = priceTag.checked;
            isCustom ? checkStat = 'checked' : checkStat = 'official pricelist';

            isCustom ? priceLabel = 'custom pricelist' : priceLabel = 'official pricelist';
            priceList = isCustom ? customPrice : officialPrice;
                           
            setTimeout(() => {
                editDraft(ref_code);
            }, 500);
           
        });
    }

    // document.getElementById("select_staff").addEventListener("click", toggleSuggest);
    // const dropdownContentElement = document.getElementById("search-results");

    // Define a function named `toggleSuggest` using arrow function syntax
    const toggleSuggest = () => {
        // Check if `selectStaff` exists and does not have the class "disabled"
        if (selectStaff && !selectStaff.classList.contains("disabled")) {
            // Toggle the display of the `search_result` element based on its current style
            // If the current display style is "none", set it to "block", otherwise set it to "none"
            search_result.style.display = search_result.style.display === "none" ? "block" : "none";
        }
    };
}

const saveInvoice = async (ref) =>{ 
    //code to save to device db
    //update invoice collections
    requisitionObject.status = 'saved';

    await window.updateInvoice(ref, JSON.stringify(requisitionObject), 'saved');
    
    //code to save to online db
    //clear invoine cart
    invoiceItemsAry = [];

    //load list of invoice
    verifyInvoice(ref);
}
 
const saveInvoiceDraft = async (ref) =>{
    //save draft to local storage
    console.log(requisitionObject);
     try {
        await window.createInvoice(ref, requisitionObject);
        console.log('invoice saved successfully');
    } catch (error) {
        console.error('Error storing invoice:', error);
    }
}
   
let amt = ''; var in_ref = '';
   
const searchInvoiceList = (searchTerm, rfc) =>{
    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = '';
    console.log(ref_code);
    // Flatten the nested array structure
    const namesData = bookList.flatMap(category => Object.values(category)[0]);
     
    let filteredData = namesData.filter(data => {
        let names = data.name.toLowerCase();
        let searchedName = searchTerm.toLowerCase();
        if(searchedName !== ""){
            return names.includes(searchedName);
        }
        
    });

    for(const itmObj of filteredData){ 
        setlog.has(itmObj) ? setlog.delete(itmObj) : setlog.add(itmObj);
    }
     
    let setAry = Array.from(setlog); 
    let popBody = document.createElement('div');

    popBody.style.cssText = `font-size: larger; background-color: rgb(255, 255, 255); border-radius: 0.5rem;
     font-weight: bold; padding: 1rem; text-align: center;  margin-bottom: 1rem;`;
    let popNav = document.createElement('div'); 
    popNav.innerHTML = `
        <span style="display:grid; grid-template-columns: 2fr 1fr; align-items: center; justify-content: center; font-size: medium; text-align: center; margin:0.5rem auto" >
                Enter the quantity needed 
            <small id="uploadList"  onclick="to_request('${ref_code}')" style="background: aqua;" class="ad_btn list"> <span>upload</span> <i class="bi bi-cloud-upload-fill"></i> </small>
        </span>
    `;
    let invoice_lyst = document.createElement('table');
    
    let tBody = document.createElement('tbody');
    let tHead = document.createElement('tr');
    tHead.innerHTML = `
        <th>Book title </th> <th>qty.</th> 
    `;
    tBody.appendChild(tHead);
    setAry.forEach(item => {
        
        let book_id = getBookInfo(item.name.toLowerCase())[0];
        let book_class = getBookInfo(item.name.toLowerCase())[1];
        t = item.name.toLowerCase(); 
        let prize = getPrice(book_class, Number(book_id)); 

        let row = document.createElement('tr');
        row.innerHTML = `<td id="${book_id}|${book_class}" style="text-align: left">${item.name.toLowerCase()}</td> 
                        <td class="qnt_text" contentEditable="true" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${amt}</td> 
                        `;
        tBody.appendChild(row);
        
    });
    invoice_lyst.appendChild(tBody); 
    invoice_lyst.id = 'title_list';
    invoice_lyst.style.marginBottom = `1rem`;
    popBody.appendChild(popNav);
    popBody.appendChild(invoice_lyst);
    pop_up.appendChild(popBody); 
    const editableElements = document.querySelectorAll('.qnt_text');
    if(editableElements){
        editableElements.forEach((element) => {
            let tytl, pryc, sect, bkSn, bkQnt;
            let buID;
            element.addEventListener('blur', () => {
                console.log('value now: ', element.textContent);
                bkQnt = Number(element.textContent);
                
                let fstChd = element.parentElement.firstElementChild;
                tytl = fstChd.textContent;
                pryc = fstChd.nextElementSibling.textContent;
                buID = fstChd.id;
                bkSn = buID.split('|')[0];
                sect = buID.split('|')[1];
                if(isNaN(bkQnt) || bkQnt === 0){
                    element.style.boxShadow = `0px 0px 3px 2px red inset`;
                    return;
                }else{
                    const uploadList = document.getElementById('uploadList');
                    uploadList.style.display = 'flex';
                    toCart(tytl, bkQnt, pryc, sect, bkSn);
                    element.style.boxShadow = `0px 0px 3px 2px rgb(38 255 0) inset`;
                    //update invoice collections
                    requisitionObject.collections = cartItemsAry;
                    //save draft to local storage
                    localStorage.setItem(ref_code, JSON.stringify(requisitionObject));
                }
                
            });
        });
    }
    // Get all editable elements on the page
    const editableTabs = Array.from(document.querySelectorAll('.qnt_text'));

    // Add event listener to each input element
    editableTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (event) => {
            // Check if the pressed key is Enter
            if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of the Enter key

            // Move focus to the next input element
            const nextIndex = (index + 1) % editableTabs.length;
            editableTabs[nextIndex].focus();
            }
        });
    });

    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const to_invoice = async (ref_c)=>{
    let pop_up = document.querySelector('.pop-content');
    //update invoice collections
    requisitionObject.collections = invoiceItemsAry;

    await window.updateInvoice(ref_c, JSON.stringify(requisitionObject), 'draft');
    
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 

    add_invoice();
}

const editDraft = async(ref_c) =>{
    appBody.innerHTML = '';  ref_code = ref_c; in_ref = ref_c; 

    const storedOrder = await getAnInvoice(ref_c);
     
    let myOrder = [];
    if (storedOrder) {
        myOrder = JSON.parse(storedOrder); 
    } else {
        myOrder = [];
    }
    if (typeof myOrder === 'object' && myOrder !== null){
        invoiceItemsAry = myOrder.collections;
        in_school = myOrder.school;
        in_address = myOrder.address;
        selDate = myOrder.date;

        requisitionObject = myOrder;
        if (Array.isArray(invoiceItemsAry) && invoiceItemsAry.length > 0){
            cost = 0;
    
            let cart_table = document.createElement('table');
            cart_table.id = 'title_list';
            cart_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <th>Book title </th> <th>price</th> <th>qty</th> <th>cost</th> 
            `;
            tBody.appendChild(tHead);
            invoiceItemsAry.forEach(item => {
        
            let book_id  = getBookInfo(item.book)[0];
            let book_class = getBookInfo(item.book)[1];

            const indexToRemove = invoiceItemsAry.indexOf(item);
                let prize = getPrice(item.bk_sch, Number(item.b_id));
                //console.log(prize, item.bk_sch, Number(item.b_id));
                let row = document.createElement('tr');
                row.innerHTML = `<td style="text-align: left">${item.book}</td> 
                                <td>₦${addCommasToNumber(prize)}</td> 
                                <td onclick="pickBook(${book_id}, '${book_class}')" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${item.qnt}</td> 
                                <td class="ibl" id="${indexToRemove}" style="box-shadow: 0px 0px 3px red inset;">₦${addCommasToNumber(prize * item.qnt)}</td>`;
                tBody.appendChild(row);
                
                cost += Number(prize * item.qnt);
            });
            cart_table.appendChild(tBody);
            
            let sum_table = document.createElement('table');
            sum_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let sumBody = document.createElement('tbody'); 
            sumBody.innerHTML = `
                <tr><td>cost of books:</td><td id="bkCost">₦${addCommasToNumber(cost)}</td></tr>
            `; 
            sum_table.appendChild(sumBody);

            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
            tFoot.innerHTML = `
                <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${myOrder.ref}" style="width: fit-content; display: block;" ></div>
                <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" id="checkout" onclick="saveInvoice('${myOrder.ref}')"> 
                    save   <div style="font-size: large; font-weight: bolder; margin-left: 1rem" class="bi bi-save-fill"></div>
                </div>
            `;
            appBody.innerHTML = `   
                <div class="title_box" style="background-color: #fff;">
                    <div class="bi bi-receipt" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                    <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">Update Invoice</div>
                </div> 

                    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                        <div class="invoiceTab"><small class="fb-ar">School: </small>      <small style="text-align: left">${myOrder.school}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left">${myOrder.address}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Date: </small>      <small style="text-align: left">${myOrder.date}</small></div>
                    </div> 

                    <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: small; text-align: left; margin: 1rem auto; font-weight: 500; text-transform: lowercase;" >
                        
                        <span style="display:flex; align-items: center;"><i class="bi bi-trash3-fill" style="color: gray;"></i> delete invoice</span>
                        <span style="display:flex; align-items: center;"><i class="bi bi-square " style="color: gray;"></i> add books</span>
                        <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: blue;"></i> change qty</span> 
                        <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: red;"></i> remove book</span>                             
                    </span>
                    <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                        <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                        <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                        <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                        
                    </div>
                    <select id="book" style="width: 100%;  display:none" name="book" required></select>
                    <input id="quantity" style="width: 50px; padding: 1rem; display:none" type="number" placeholder="0" />
                </div> 
            `;
            let adNote = document.createElement('div');
            adNote.style.cssText = `margin: 1rem auto; text-align: center;`; 
            adNote.innerHTML =`
                <div style="display: grid; grid-template-columns: 1fr 0fr 1fr; gap: 10px; align-items: center;"> 
                  <small style="text-align: right;">current Pricelist: </small>
                  <label class="switch"><input id="togglePrice" type="checkbox" ${checkStat}><span class="slider round"></span></label>
                  <small style="text-align: left;"> <b>${priceLabel}</b></small>
                </div>
            `;

            appBody.appendChild(cart_table);
            appBody.appendChild(sum_table);
            appBody.appendChild(adNote);
            appBody.appendChild(tFoot);   
        }
        else{
                       
            let sum_table = document.createElement('table');
            sum_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let sumBody = document.createElement('tbody'); 
            sumBody.innerHTML = `
                <tr><td>cost of books:</td><td id="bkCost">₦${addCommasToNumber(cost)}</td></tr>
            `; 
            sum_table.appendChild(sumBody);

            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
            tFoot.innerHTML = `
                <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${ref_c}" style="width: fit-content; display: block;" ></div>
                <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" id="checkout" onclick="saveInvoice('${ref_c}')"> 
                    save   <div style="font-size: large; font-weight: bolder; margin-left: 1rem" class="bi bi-save-fill"></div>
                </div>
            `;
             appBody.innerHTML = `   
                <div class="title_box" style="background-color: #fff;">
                    <div class="bi bi-receipt" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                    <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">New Invoice</div>
                </div> 

                    <div style=" text-transform:none; background: #f0f0f0; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">
                        <div class="invoiceTab"><small class="fb-ar">School: </small>      <small style="text-align: left">${in_school}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Address: </small>      <small style="text-align: left">${in_address}</small></div>
                        <div class="invoiceTab"><small class="fb-ar">Date: </small>      <small style="text-align: left">${selDate}</small></div>
                    </div> 

                        <span style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: small; text-align: left; margin: 1rem auto; font-weight: 500; text-transform: lowercase;" >
                    
                            <span style="display:flex; align-items: center;"><i class="bi bi-trash3-fill" style="color: gray;"></i> to delete invoice</span>
                            <span style="display:flex; align-items: center;"><i class="bi bi-square " style="color: gray;"></i> to add books</span>
                            <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: blue;"></i> to change qty</span> 
                            <span style="display:flex; align-items: center;"><i class="bi bi-square" style="color: red;"></i> to remove book</span>                             
                        </span>

                      <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                        <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                        <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                        <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                        
                      </div>
                      <select id="book" style="width: 100%;  display:none" name="book" required></select>
                      <input id="quantity" style="width: 50px; padding: 1rem; display:none" type="number" placeholder="0" />
                  </div> 
            `;
            let adNote = document.createElement('div');
            adNote.style.cssText = `margin: 1rem auto; text-align: center;`; 
            adNote.innerHTML =`
                <div style="display: grid; grid-template-columns: 1fr 0fr 1fr; gap: 10px; align-items: center;"> 
                    <small style="text-align: right;">current Pricelist: </small>
                    <label class="switch"><input id="togglePrice" type="checkbox" ${checkStat}><span class="slider round"></span></label>
                    <small style="text-align: left;"> <b>${priceLabel}</b></small>
                </div> 
            `;
            appBody.appendChild(sum_table);
            appBody.appendChild(adNote);
            appBody.appendChild(tFoot);
        }
    }
   
    $(function(){
        $('#requestDate').change(function(e){ 
            e.preventDefault();
            requisitionObject = {};
            in_school = $('#schoolName').val().trim();
            in_address = $('#address').val().trim();

            document.getElementById('scName').innerHTML = in_school;
            document.getElementById('scLoca').innerHTML = in_address;
   
            let verify = "saved"; 
            let rqstDate = new Date($('#requestDate').val());
            let date = new Date($('#requestDate').val());
            
            currentDate  = date.toISOString().split('T')[0];
           
            let day = rqstDate.getDate();
            let month = rqstDate.getMonth() + 1;
            let year = rqstDate.getFullYear();

            selDate = writeMonth(month)+' '+ day +', '+ year;
            document.getElementById('cDate').innerHTML = selDate;

            //add season to invoice array
            requisitionObject.season = '2023/2024';
            //add date to invoice array
            requisitionObject.date = selDate; 
            //add school name to invoice array
            requisitionObject.school = in_school;
            //add address to invoice array
            requisitionObject.address = in_address;
            //add verification status
            requisitionObject.status = verify;
           
            $('#requestData').show();
            $('#introBlock').hide();
            $('#requestDate').attr('readonly', true);

            /**
             * on click of selecting a date for the invoice,
             * check if local copy of draft id exists, if it does,
             * update it, else
             *  create a local copy as draft
             */
              
            let code = '';
            let bkCdAry = in_school.split(' ');
            for(let wrd of bkCdAry){
              code += wrd.charAt(0);
            }
             
            let nCode =  code + Math.floor(new Date().getTime() / 1000).toString(16);

            //create a refId for the invoice
            requisitionObject.ref = nCode;
            //save ref code
            ref_code = nCode;
            draftCode = nCode;
            
            //update invoice collections
            requisitionObject.collections = invoiceItemsAry;
            //draft is new, create draft
            //saveInvoiceDraft(nCode);
            window.createInvoice(nCode, requisitionObject);
            
            });   
        }); 
      
        const titleCat = document.querySelectorAll('.squ_bx');

        function hasClass(element, className) {
           // Check if the element has the specified class using the classList API
            return element.classList.contains(className);
        }

        // set clicked btn to active
        titleCat.forEach(bukBox => {
            bukBox.addEventListener('click', () => {
                bukBox.classList.toggle('bx_sel');
                searchInvoiceList(bukBox.id);
            });
    
        });

        const priceTag = document.getElementById('togglePrice');
         
        if (priceTag && priceLabel) {
            priceTag.addEventListener('change', () => {
                const isCustom = priceTag.checked;
                isCustom ? checkStat = 'checked' : checkStat = 'official pricelist';

                isCustom ? priceLabel = 'custom price' : priceLabel = 'official price';
                priceList = isCustom ? customPrice : officialPrice;
                
                setTimeout(() => {
                    editDraft(ref_c);
                }, 500);
                
            });
        }
        

}

const completeInvoiceVerification = async(ref_c) =>{
    // Retrieve the array from local storage
    const storedOrder = await getAnInvoice(ref_c);

    let myOrder = [];

    if (storedOrder) {
        myOrder = JSON.parse(storedOrder);
    } else {
        myOrder = [];
    }

    if (typeof myOrder === 'object' && myOrder !== null){
        requisitionObject = myOrder;
    }

    let pyday;    
    requisitionObject.status = 'verified';
    let dayte = new Date($('#payDay').val());; 

    let day = dayte.getDate();
    let month = dayte.getMonth() + 1;
    let year = dayte.getFullYear();

    pyday = writeMonth(month)+' '+ day +', '+ year;

    requisitionObject.payday = pyday;
    requisitionObject.rate = $('#discount').val().trim();;
    requisitionObject.receiver = $('#receiver').val().trim();
    requisitionObject.contact = $('#receiver_phone').val().trim();

    console.log(requisitionObject);

    await window.updateInvoice(ref_c, JSON.stringify(requisitionObject), 'verified');
    //load invoice for sharing
    displayInvoice(ref_c);
}



const requestForm = () =>{
     
    let reqDiv = document.createElement('div');
        reqDiv.setAttribute('id', 'reqDiv'); 
        reqDiv.innerHTML = `
          <div style="margin: 10px auto; text-align: center;">
              <h1 style="font-weight: 300;">Requisition</h1>
  
              <div id="reqTitle">
                  <div class="bi bi-calendar2-event" style="margin-bottom:1rem;" > 
                      <span style="font-size: small; vertical-align: middle;" >pick a date to start</span> 
                  </div> 
              </div>
              
              <input style="width: 80%; padding: 1rem;" id="requestDate" type="date" />
              <form>
                  <div id="requestData" style="display:none;">
                        <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                          <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                          <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                          <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                        </div>
                  </div>
             </form>
    
          </div>     
      `;
      appBody.innerHTML = '';
      appBody.appendChild(reqDiv);
       
      $(function(){
        $('#requestDate').change(function(e){ 
          e.preventDefault();
          requisitionObject = {};
          let verify = "draft"; 
          let rqstDate = new Date($('#requestDate').val());
          let day = rqstDate.getDate();
          let month = rqstDate.getMonth() + 1;
          let year = rqstDate.getFullYear();
              selDate = writeMonth(month)+' '+ day+getOrdinalSuffix(day) +', '+ year;
          //add season to requsition array
          requisitionObject.season = '2023/2024';
          //add date to requsition array
          requisitionObject.date = selDate;
          //add verification status
          requisitionObject.status = verify;
  
          $('#requestData').show();
          $('#requestDate').hide();
          $('#requestDate').attr('readonly', true); 
                        
          let code = '';
          let bkCdAry = in_school.split(' ');
          for(let wrd of bkCdAry){
            code += wrd.charAt(0);
          }
           //code + 
          let nCode =  Math.floor(new Date().getTime() / 1000).toString(16);
  
          //create a refId for the invoice
          requisitionObject.ref = nCode;
          //save ref code
          ref_code = nCode;
          draftCode = nCode;
          
          //update invoice collections
          requisitionObject.collections = cartItemsAry;
          //draft is new, create draft
          saveRequestDraft(ref_code);
        });
   
      });
  
      const titleCat = document.querySelectorAll('.squ_bx');
      // set clicked btn to active
      titleCat.forEach(bukBox => {
          bukBox.addEventListener('click', () => {
              bukBox.classList.toggle('bx_sel');
              console.log(ref_code);
              searchRequestList(bukBox.id, ref_code);
          });
      });
  
}

const upload_request =()=>{

    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = `

    <div style="font-size: larger; background-color: rgb(255, 255, 255); border-radius: 0.5rem;
     font-weight: bold; padding: 1rem; text-align: center;  margin-bottom: 1rem;">Save Requisition<div style="float: right; margin-top: -6px;"></div><br/>
     <small style="font-weight: 400;">upload a picture of your requisition slip to save</small>
      <div style="font-weight: 400; font-size: smaller;">
      <br/>
    
      <div style="display: grid; font-weight: 400;
        font-size: smaller;grid-template-columns: 3fr 1fr 1fr;
        align-items: center;
        gap: 5px;">

        <small style="text-align: left; font-weight: 400;">
            <input type="text" style="padding:1rem;" readonly placeholder="requisition pic..." />
        </small>
        <div class="bi bi-image" style="font-size: 2.1rem; color: gray; background: white;
            border-radius: 5px;
            padding: 3px 8px;
            border: 1px solid #dfdfdf"></div>
        <div class="bi bi-camera2" style="font-size: 2.1rem; color: gray;
            background: white;
            border-radius: 5px;
            padding: 3px 8px;
            border: 1px solid #dfdfdf"></div>
      </div>
      
      <div class="grey-btn nxt-btn" style="margin-top: 2rem;">Upload</div>
    </div>
    </div>
    `;
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const saveRequisition = async (ref) =>{ 
    //code to save to device db
    //update invoice collections
    requisitionObject.status = 'saved';

    await window.updateRequest(ref, JSON.stringify(requisitionObject), 'saved');
    
    //code to save to online db
    //clear invoine cart
    invoiceItemsAry = [];

    //load list of invoice
    //verifyInvoice(ref);
}

const saveRequestDraft = async (ref) =>{
    //save draft to storage
    console.log(requisitionObject);
    try {
    await window.createRequest(ref, requisitionObject);
        console.log('request saved successfully');
        editRequest(ref);
    } catch (error) {
        console.error('Error storing request:', error);
    }
}

const searchRequestList = (searchTerm) =>{
    let pop_up = document.querySelector('.pop-content');
    pop_up.innerHTML = '';
    console.log(ref_code);
    // Flatten the nested array structure
    const namesData = bookList.flatMap(category => Object.values(category)[0]);
    
    let filteredData = namesData.filter(data => {
        let names = data.name.toLowerCase();
        let searchedName = searchTerm.toLowerCase();
        if(searchedName !== ""){
            return names.includes(searchedName);
        }
        
    });

    for(const itmObj of filteredData){ 
        setlog.has(itmObj) ? setlog.delete(itmObj) : setlog.add(itmObj);
    }
    
    let setAry = Array.from(setlog);
    let popBody = document.createElement('div');
    popBody.style.cssText = `font-size: larger; background-color: rgb(255, 255, 255); border-radius: 0.5rem;
     font-weight: bold; padding: 1rem; text-align: center;  margin-bottom: 1rem;`;
    let popNav = document.createElement('div'); 
    popNav.innerHTML = `
        <span style="display:grid; grid-template-columns: 2fr 1fr; align-items: center; justify-content: center; font-size: medium; text-align: center; margin:0.5rem auto" >
                Enter the quantity needed 
            <small id="uploadList"  onclick="to_request('${ref_code}')" style="background: aqua;" class="ad_btn list"> <span>upload</span> <i class="bi bi-cloud-upload-fill"></i> </small>
        </span>
    `;
    let invoice_lyst = document.createElement('table');
    
    let tBody = document.createElement('tbody');
    let tHead = document.createElement('tr');
    tHead.innerHTML = `
        <th>Book title </th> <th>qty.</th> 
    `;
    tBody.appendChild(tHead);
    setAry.forEach(item => {
        
        let book_id = getBookInfo(item.name.toLowerCase())[0];
        let book_class = getBookInfo(item.name.toLowerCase())[1];
        t = item.name.toLowerCase(); 
        let prize = getPrice(book_class, Number(book_id)); 

        let row = document.createElement('tr');
        row.innerHTML = `<td id="${book_id}|${book_class}" style="text-align: left">${item.name.toLowerCase()}</td> 
                        <td class="qnt_text" contentEditable="true" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${amt}</td> 
                        `;
        tBody.appendChild(row);
        
    });
    invoice_lyst.appendChild(tBody); 
    invoice_lyst.id = 'title_list';
    invoice_lyst.style.marginBottom = `1rem`;
    popBody.appendChild(popNav);
    popBody.appendChild(invoice_lyst);
    pop_up.appendChild(popBody); 
    const editableElements = document.querySelectorAll('.qnt_text');
    if(editableElements){
        editableElements.forEach((element) => {
            let tytl, pryc, sect, bkSn, bkQnt;
            let buID;
            element.addEventListener('blur', () => {
                console.log('value now: ', element.textContent);
                bkQnt = Number(element.textContent);
                
                let fstChd = element.parentElement.firstElementChild;
                tytl = fstChd.textContent;
                pryc = fstChd.nextElementSibling.textContent;
                buID = fstChd.id;
                bkSn = buID.split('|')[0];
                sect = buID.split('|')[1];
                if(isNaN(bkQnt) || bkQnt === 0){
                    element.style.boxShadow = `0px 0px 3px 2px red inset`;
                    return;
                }else{
                    const uploadList = document.getElementById('uploadList');
                    uploadList.style.display = 'flex';
                    toRequestCart(tytl, bkQnt, pryc, sect, bkSn);
                    element.style.boxShadow = `0px 0px 3px 2px rgb(38 255 0) inset`;
                    //update invoice collections
                    requisitionObject.collections = cartItemsAry;
                     
                }
                
            });
        });
    }
    // Get all editable elements on the page
    const editableTabs = Array.from(document.querySelectorAll('.qnt_text'));

    // Add event listener to each input element
    editableTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', (event) => {
            // Check if the pressed key is Enter
            if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default behavior of the Enter key

            // Move focus to the next input element
            const nextIndex = (index + 1) % editableTabs.length;
            editableTabs[nextIndex].focus();
            }
        });
    });

    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 
}

const to_request = async (ref_c)=>{
    let pop_up = document.querySelector('.pop-content');
    //update invoice collections
    requisitionObject.collections = cartItemsAry;

    await window.updateRequest(ref_c, JSON.stringify(requisitionObject), 'draft');
    
    pop_up.parentElement.style.display = oldPop.style.display === 'none' ? 'block' : 'none'; 

    await editRequest(ref_c);
}

const displayRequest = async() =>{

    const myRequests = await window.getRequestList();
    console.log(myRequests);

    if(oldPop){
        oldPop.style.display = 'none'; oldPop.innerHtml = '';
    }

    try{
        if(myRequests.length  !== 0){
            let requiTab = document.createElement('table');
            requiTab.style.backgroundColor = 'white'; 
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = ` 
                <th>Date</th> 
                <th class="flat">status  <input class="payCheck" type="checkbox" /> </th>  
            `;
            tBody.appendChild(tHead);
            let school = '', invoice_date = '', invoice_status = '', invoice_ref = '';
            let hasDraft = false;

            myRequests.forEach(key => {          
                if (typeof key === 'object' && key !== null){
                    
                    invoice_date = key.date;
                    school = key.school;
                    invoice_status = key.status;
                    invoice_ref = key.ref;

                    let fwd, bck = '';

                    let row = document.createElement('tr');
                    switch (invoice_status) {
                        case 'verified':
                            row.onclick = ()=>{ displayInvoice(key.ref) };
                            bck = '#00ffff61';
                            break;
                        case 'pending':
                            row.onclick = ()=>{verifyInvoice(key.ref) };
                            bck = '#ffff0069';
                            break;
                    
                        default:
                            row.onclick = ()=>{ editRequest(key.ref) };
                            hasDraft = true;
                            break;
                    }
                    row.innerHTML = `  
                    <td style="text-align: left;">${invoice_date}</td>  
                    <td style="background-color:${bck};">${invoice_status}</td>`;
 
                    tBody.appendChild(row);
                }                
            });

            requiTab.appendChild(tBody);

            let pendingBlock = document.createElement('div');
            pendingBlock.style.cssText = `text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;`;

            // Create the initial structure
            pendingBlock.innerHTML = `
                <div class="list">Pending requisition <span></span></div>

                <div class="list">
                    <div>${invoice_date} <b><i class="bi bi-arrow-down-short"></i></b></div>
                    <div class="mid"> <i class="bi bi-basket"></i></div> 
                </div>

                <div class="dropdown-content myDropdown" id="reqTab"></div>

                <div id="payBtn" class="list" style="display: none;">
                    Verify request: 
                    <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="verify_pay()">yes</span>
                </div>
            `;
            
            appBody.innerHTML = `
                <h1 style="font-weight: 300; margin: 1rem auto; text-align: center;">Requisition</h1>
                    <div style="text-transform: none;
                        background: #f7f7f7;
                        box-shadow: 0px 0px 3px #c5c5c5;
                        margin: 2px auto;"> 
                        <div class="list" style="text-align: center; margin: 5px auto; font-weight: bold;">Season: <span><select style="background: white;"><option>select season...</option><option>2023/2024</option><select></span></div>
                    </div>

                <div>
                <div id="newREQ" style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;"> 
                        <div class="list">write new requisition: <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="requestForm()">Add</span></div>
                </div>
            `;
            pendingBlock.children[2].appendChild(requiTab);
            const newREQBtn =  document.querySelector('#newREQ');
            if(hasDraft === true){
                newREQBtn.style.display = 'none';
            }else{
                newREQBtn.style.display = '';
            }
            
            appBody.appendChild(pendingBlock);

             
        }
        else{
            
            appBody.innerHTML = '';
            if(oldPop){
                oldPop.style.display = 'none'; oldPop.innerHtml = '';
            }
            appBody.innerHTML = `
                <div style="margin: 10px auto; text-align: center;">
                    <h1 style="font-weight: 300;">Requisition</h1>

                    <div style="text-transform: none;
                        background: #f7f7f7;
                        box-shadow: 0px 0px 3px #c5c5c5;
                        margin: 2px auto;"> 
                        <div class="list" style="text-align: center; margin: 5px auto; font-weight: bold;">Season: <span><select style="background: white;"><option>select season...</option><option>2023/2024</option><select></span></div>
                    </div>

                    <img src="figures/undraw_Diary_re_4jpc.png" width="100%" />
                    
                    <div style="width: 70%; margin: 1rem auto; text-align: center; text-transform: none; font-size: smaller;">
                        your requisition log is empty, write a new requisition or select a different season to get started.</div>
            
                    <div class="grey-btn nxt-btn" onclick="requestForm()"> new requisition </div> 
            
                </div>
            `;   
        }        
      }catch(err){
        console.error('Error reading data:', err.message || err);
      }
    
    //appBody.innerHTML = '';
    let appBody_innerHTML = `

    <div style=" ">   
            <div class="list">Pending requisition: <b>₦502,345 </b> </div>
            <div class="list">
                <div><b>₦502,345 </b><i class="bi bi-arrow-down-short"></i></div>
                <div class="mid"> 12/02/2023 </div> 
            </div>
                <div class="dropdown-content myDropdown"> 
                    <table style="background: white;">
                        <tbody>
                            <tr><th>Amount</th> <th>Date</th> <th class="flat">status  <input class="payCheck" type="checkbox" /> </th></tr>
                            <tr><td style="font-weight: bold;">₦52,000 </td> <td>12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>pending <span class="bi bi-x-circle-fill" style="margin-left:10px; color: red;"></span></td></tr> 
                            <tr><td style="font-weight: bold;">₦252,000 </td> <td >12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>received </td></tr>
                        </tbody>
                    </table>
                    <div id="payBtn" class="list" style="display: none;">Verify request: <span class="grey-btn nxt-btn" style="width: fit-content; margin-right: -0.3rem;" onclick="verify_pay()">yes</span></div>
                </div>
    </div>

    <div style=" text-transform:none; background: #f0f0f00f; box-shadow: 0px 0px 3px #6d6d6d; margin: 10px auto;">   
      
            <div class="list"> Waybill: <b>₦502,345 </b> </div> 
            
            <div class="list">
                <div><b>₦132,000</b> <i class="bi bi-arrow-down-short"></i> </div> <div class="mid">15/05/2023 <i class="bi bi-journals"></i></div>
            </div>
            <div class="dropdown-content myDropdown">
                    <table style="background: white; ">
                        <tbody>
                            <tr><th>Amount</th> <th>Date</th> <th>status</th></tr>
                            <tr><td style="font-weight: bold;">₦52,000 </td> <td>12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>received </td></tr> 
                            <tr><td style="font-weight: bold;">₦252,000 </td> <td >12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>received </td></tr>
                        </tbody>
                    </table>  
            </div>
                        
            <div class="list">
                <div><b>₦332,000</b> <i class="bi bi-arrow-down-short"></i> </div> <div class="mid">15/05/2023 <i class="bi bi-journals"></i></div>
            </div>
            <div class="dropdown-content myDropdown">
                    <table style="background: white; ">
                        <tbody>
                            <tr><th>Amount</th> <th>Date</th> <th>status</th></tr>
                            <tr><td style="font-weight: bold;">₦52,000 </td> <td>12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>received </td></tr> 
                            <tr><td style="font-weight: bold;">₦252,000 </td> <td >12/02/2023 <span class="bi bi-image" style="margin-left:10px;"></span></td> <td>received </td></tr>
                        </tbody>
                    </table>  
            </div>
       
        </div>
    </div>
    `;
              
    const payboxes = document.querySelectorAll('.payCheck');
    // Get the element to show/hide
    const elementX = document.getElementById('payBtn');

    // Add a change event listener to each checkbox
    payboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() { 
            // Check if any checkbox is checked
            const isAnyChecked = Array.from(payboxes).some(function(checkbox) {
              return checkbox.checked;
            });
    
            // Show or hide the element based on the checkbox state
            elementX.style.display = isAnyChecked ? 'flex' : 'none';
          });
    });

    dropTable();  
}

const editRequest = async(ref_c) =>{
    appBody.innerHTML = '';  ref_code = ref_c; in_ref = ref_c; 

    const storedOrder = await window.get1Request(ref_c);
     
    let myOrder = [];
    if (storedOrder) {
        myOrder = JSON.parse(storedOrder); 
    } else {
        myOrder = [];
    }
    if (typeof myOrder === 'object' && myOrder !== null){
        cartItemsAry = myOrder.collections;
        in_school = myOrder.school;
        in_address = myOrder.address;
        selDate = myOrder.date;

        requisitionObject = myOrder;
        if (Array.isArray(cartItemsAry) && cartItemsAry.length > 0){
            cost = 0;
    
            let cart_table = document.createElement('table');
            cart_table.id = 'title_list';
            cart_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let tBody = document.createElement('tbody');
            let tHead = document.createElement('tr');
            tHead.innerHTML = `
                <tr><td>books title:</td><td id="bkCost">quantity</td></tr> 
            `;
            tBody.appendChild(tHead);
            cartItemsAry.forEach(item => {
        
            let book_id  = getBookInfo(item.book)[0];
            let book_class = getBookInfo(item.book)[1];

            const indexToRemove = cartItemsAry.indexOf(item);
                let prize = getPrice(item.bk_sch, Number(item.b_id));
                
                let row = document.createElement('tr');
                row.innerHTML = `<td style="background: white; text-align: left; box-shadow: 0px 0px 3px red inset;">${item.book}</td> 
                                <td onclick="pickBook(${book_id}, '${book_class}')" style="box-shadow: 0px 0px 3px rgb(0, 140, 255) inset;">${item.qnt}</td> 
                               `;
                tBody.appendChild(row);
                
                cost += Number(prize * item.qnt);
            });

            cart_table.appendChild(tBody);
           
            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
            tFoot.innerHTML = `
                <div class="list cancle-btn invc_btn bi bi-trash3-fill" id="${myOrder.ref}" style="width: fit-content; display: block;" ></div>
                <div class="list proceed-btn nxt-btn" style="background-color:yellow; width: fit-content;" id="checkout" onclick="upload_request('${myOrder.ref}')"> 
                    save   <div style="font-size: large; font-weight: bolder; margin-left: 1rem" class="bi bi-cloud-upload-fill"></div>
                </div>
            `;
            appBody.innerHTML = `   
            <div class="title_box" style="background-color: #fff;">
                <div class="bi bi-highlighter" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">Requisition</div>
            </div> 

              <div id="reqTitle"  style="text-align: center">
                  <div style="margin-bottom:1rem;" > 
                      <span style="font-size: small; vertical-align: middle;" >updating requisition for <b>${selDate}</b></span> 
                  </div> 
              </div> 

                <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                    <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                    <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                    <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                </div>
            `;
            
            appBody.appendChild(cart_table); 
            appBody.appendChild(tFoot);   
        }
        else{
                       
            let sum_table = document.createElement('table');
            sum_table.style.cssText = 'display: table; margin-bottom: 0.5rem';
            let sumBody = document.createElement('tbody'); 
            sumBody.innerHTML = `
                <tr><td>books title:</td><td id="bkCost">quantity</td></tr>
            `; 
            sum_table.appendChild(sumBody);

            let tFoot = document.createElement('div');
            tFoot.classList.add('btm_nav_box');
             
             appBody.innerHTML = `   
                <div class="title_box" style="background-color: #fff;">
                    <div class="bi bi-highlighter" style="padding: 5px 1rem; font-size: 2.2rem;"></div>
                    <div class="span" style="margin-left: -3rem; font-size: x-large; font-weight: 300;">Requisition</div>
                </div> 

              <div id="reqTitle"  style="text-align: center">
                  <div style="margin-bottom:1rem;" > 
                      <span style="font-size: small; vertical-align: middle;" >updating requisition for <b>${selDate}</b></span> 
                  </div> 
              </div> 

                <div style=" margin: 0.5rem auto; overflow: auto; white-space: nowrap;">
                    <small id="prep" class="squ_bx"> prep. work</small> <small id="math" class="squ_bx "> maths</small>    <small id="english" class="squ_bx">english</small>    <small id="spelling" class="squ_bx">spelling</small>
                    <small id="phonics" class="squ_bx">phonics</small>    <small id="colour" class="squ_bx">colouring</small>    <small id="cultural" class="squ_bx "> cult. arts</small>
                    <small id="quant" class="squ_bx "> quant.</small>    <small id="verbal" class="squ_bx">verbal</small>    <small id="grammar" class="squ_bx">eng. grm</small>
                </div>
                 
            `;
             
            appBody.appendChild(sum_table);  
        }
    }
   
    $(function(){
        $('#requestDate').change(function(e){ 
            e.preventDefault();
            requisitionObject = {};
            in_school = $('#schoolName').val().trim();
            in_address = $('#address').val().trim();

            document.getElementById('scName').innerHTML = in_school;
            document.getElementById('scLoca').innerHTML = in_address;
   
            let verify = "saved"; 
            let rqstDate = new Date($('#requestDate').val());
            let date = new Date($('#requestDate').val());
            
            currentDate  = date.toISOString().split('T')[0];
           
            let day = rqstDate.getDate();
            let month = rqstDate.getMonth() + 1;
            let year = rqstDate.getFullYear();

            selDate = writeMonth(month)+' '+ day +', '+ year;
            document.getElementById('cDate').innerHTML = selDate;

            //add season to invoice array
            requisitionObject.season = '2023/2024';
            //add date to invoice array
            requisitionObject.date = selDate; 
            //add school name to invoice array
            requisitionObject.school = in_school;
            //add address to invoice array
            requisitionObject.address = in_address;
            //add verification status
            requisitionObject.status = verify;
           
            $('#requestData').show();
            $('#introBlock').hide();
            $('#requestDate').attr('readonly', true);

            let code = '';
            let bkCdAry = in_school.split(' ');
            for(let wrd of bkCdAry){
              code += wrd.charAt(0);
            }
             
            let nCode =  code + Math.floor(new Date().getTime() / 1000).toString(16);

            //create a refId for the invoice
            requisitionObject.ref = nCode;
            //save ref code
            ref_code = nCode;
            draftCode = nCode;
            
            //update invoice collections
            requisitionObject.collections = cartItemsAry;
            //draft is new, create draft 
            window.createInvoice(nCode, requisitionObject);
            
            });   
     }); 

    function hasClass(element, className) {
        // Check if the element has the specified class using the classList API
        return element.classList.contains(className);
    }

    const titleCat = document.querySelectorAll('.squ_bx');
    // set clicked btn to active
    titleCat.forEach(bukBox => {
        bukBox.addEventListener('click', () => {
            bukBox.classList.toggle('bx_sel');
            console.log(ref_code);
            searchRequestList(bukBox.id, ref_code);
        });
    });

    const priceTag = document.getElementById('togglePrice');
        
    if (priceTag && priceLabel) {
        priceTag.addEventListener('change', () => {
            const isCustom = priceTag.checked;
            isCustom ? checkStat = 'checked' : checkStat = 'official pricelist';

            isCustom ? priceLabel = 'custom price' : priceLabel = 'official price';
            priceList = isCustom ? customPrice : officialPrice;
            
            setTimeout(() => {
                editDraft(ref_c);
            }, 500);
            
        });
    }
}

const completeRequestVerification = async(ref_c) =>{
    // Retrieve the array from local storage
    const storedOrder = await window.get1Request(ref_c);

    let myOrder = [];

    if (storedOrder) {
        myOrder = JSON.parse(storedOrder);
    } else {
        myOrder = [];
    }

    if (typeof myOrder === 'object' && myOrder !== null){
        requisitionObject = myOrder;
    }

    let pyday;    
    requisitionObject.status = 'verified';
    let dayte = new Date($('#payDay').val());; 

    let day = dayte.getDate();
    let month = dayte.getMonth() + 1;
    let year = dayte.getFullYear();

    pyday = writeMonth(month)+' '+ day +', '+ year;

    requisitionObject.payday = pyday;
    requisitionObject.rate = $('#discount').val().trim();;
    requisitionObject.receiver = $('#receiver').val().trim();
    requisitionObject.contact = $('#receiver_phone').val().trim();

    console.log(requisitionObject);

    await window.updateRequest(ref_c, JSON.stringify(requisitionObject), 'verified');
    //load invoice for sharing
    displayInvoice(ref_c);
}

//npx webpack