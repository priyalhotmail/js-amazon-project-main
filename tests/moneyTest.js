import { formatCurrency } from "../scripts/utils/money.js";

console.log(' Test suite: formatcurrency function');

console.log('-- Test Normal currency convertion')
if(formatCurrency(1000) === '10.00'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(1000));
}

console.log('-- Test 0 cents convertion');

if(formatCurrency(0) === '0.00'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(0));
}


console.log('-- Test round up with convertion');
if(formatCurrency(1249.5) === '12.50'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(1249.5));
}


console.log('-- Test currency convertion with decimals');
if(formatCurrency(2450.5) === '24.51'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(2450.5));
}


console.log('-- Test round up with convertion');
if(formatCurrency(2000.5) === '20.01'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(2000.5));
}


console.log('-- Test negative currency convertion');
if(formatCurrency(-2000.5) === '-20.00'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(-2000.5));
}


console.log('-- Test round down with convertion');
if(formatCurrency(2000.4) === '20.00'){
    console.log('+ Test passed');
}else {
    console.log('- Test failed ' + formatCurrency(2000.4));
}