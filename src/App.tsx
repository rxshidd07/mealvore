/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  MapPin, 
  ChevronDown, 
  Star, 
  Clock, 
  Navigation, 
  Verified, 
  ChefHat, 
  Leaf, 
  ShieldCheck, 
  History,
  ArrowLeft,
  ArrowRight,
  Share2,
  Heart,
  Minus,
  Plus,
  Calendar,
  Home,
  Receipt,
  User,
  UtensilsCrossed,
  Cake,
  Map,
  Sprout,
  Soup,
  CheckCircle2,
  Filter,
  MessageSquare,
  Send,
  ShoppingBag,
  Trash2,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Smartphone,
  HandCoins,
  Utensils,
  Camera,
  Phone,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Screen = 'home' | 'chef-profile' | 'item-detail' | 'orders' | 'plan-menu' | 'plan-listing' | 'search' | 'profile' | 'checkout' | 'region-menu';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  chefName: string;
  img: string;
}

// --- Shared Components ---

// --- Plan Data ---
const CHEFS_DATA = {
  'auntie-meera': {
    id: 'auntie-meera',
    name: 'Auntie Meera',
    bio: 'Cooking with love for 20 years. Specializes in authentic Maharashtrian cuisine, bringing the traditional flavors of Puneri and Malvani households straight to your table. Every dish is prepared with hand-ground spices and a dash of tradition.',
    rating: 4.9,
    reviews: '120+',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
    headerImg: 'https://images.unsplash.com/photo-1556910116-e220f712735d?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Maharashtrian', 'Thali Special', 'Traditional Sweets'],
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1556911220-e15224bbaf39?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1516715065035-4306b895445d?auto=format&fit=crop&q=80&w=200'
    ],
    menu: [
      { name: 'Puran Poli Thali', price: '₹180', meta: 'Authentic sweet flatbread with Amti', tag: 'HOMEMADE', img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=500' },
      { name: 'Batata Vada (Set of 4)', price: '₹120', meta: 'Crispy potato fritters with garlic chutney', tag: 'FRESH TODAY', img: 'https://images.unsplash.com/photo-1601050690597-df056fb1779f?auto=format&fit=crop&q=80&w=500' },
      { name: 'Homemade Paneer Butter Masala', price: '₹280', meta: 'Rich, creamy and mildly spicy classic', tag: 'BEST SELLER', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=500' }
    ]
  },
  'punjabi-kitchen': {
    id: 'punjabi-kitchen',
    name: 'Mrs. Kaur',
    bio: 'Bringing the heart of Punjab to Kolkata. My recipes have been passed down through four generations, featuring hand-churned butter and farm-fresh mustard greens.',
    rating: 4.8,
    reviews: '85+',
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=300',
    headerImg: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1000',
    specialties: ['North Indian', 'Tandoori', 'Slow-cooked Dals'],
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&q=80&w=200'
    ],
    menu: [
      { name: 'Sarson da Saag & Makki di Roti', price: '₹220', meta: 'Winter special with white butter', tag: 'SEASONAL', img: 'https://images.unsplash.com/photo-1626082855146-56543c796da8?auto=format&fit=crop&q=80&w=500' },
      { name: 'Stuffed Amritsari Kulcha', ingredients: 'Potato, Onion, Cumin', price: '₹150', meta: 'Crispy flatbread with chole', tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1601050690597-df056fb1779f?auto=format&fit=crop&q=80&w=500' }
    ]
  },
  'kerala-kitchen': {
    id: 'kerala-kitchen',
    name: 'Chef Thomas',
    bio: 'Authentic flavors from the backwaters. Specializing in seafood and coconut-based curries using spices sourced directly from Kerala.',
    rating: 4.7,
    reviews: '60+',
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300',
    headerImg: 'https://images.unsplash.com/photo-1516715065035-4306b895445d?auto=format&fit=crop&q=80&w=1000',
    specialties: ['South Indian', 'Seafood', 'Appam & Stew'],
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1556911220-e15224bbaf39?auto=format&fit=crop&q=80&w=200'
    ],
    menu: [
      { name: 'Malabar Fish Curry', price: '₹320', meta: 'Tangy red fish curry with coconut oil', tag: 'MUST TRY', img: 'https://images.unsplash.com/photo-1595131838585-344372e3f8d8?auto=format&fit=crop&q=80&w=500' },
      { name: 'Appam with Veg Stew', price: '₹200', meta: 'Lacy rice pancakes with creamy stew', tag: 'HEALTHY', img: 'https://images.unsplash.com/photo-1556910116-e220f712735d?auto=format&fit=crop&q=80&w=500' }
    ]
  }
};

const PLANS_DATA = {
  'tiffin': {
    id: 'tiffin',
    title: 'Daily Tiffin',
    meta: 'Home-style Comfort',
    desc: 'Perfectly balanced meals for your daily dietary needs. Prepared fresh every morning with low oil and high love.',
    price: '₹100',
    unit: 'per meal',
    img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-primary/5',
    tagColor: 'bg-primary',
    meals: [
      { day: 'Day 1', main: 'Roti + Aloo Matar Sabzi + Salad', items: ['2 Rotis', 'Aloo Matar', 'Fresh Salad'], kcal: 350, protein: '10g', fat: '8g', carbs: '60g' },
      { day: 'Day 2', main: 'Jeera Rice + Dal Tadka', items: ['Jeera Rice', 'Yellow Dal Tadka'], kcal: 400, protein: '12g', fat: '10g', carbs: '65g' },
      { day: 'Day 3', main: 'Vegetable Khichdi + Curd', items: ['Veg Khichdi', 'Fresh Curd'], kcal: 320, protein: '9g', fat: '7g', carbs: '55g' },
      { day: 'Day 4', main: 'Poha with Peanuts', items: ['Poha', 'Roasted Peanuts', 'Onion & Sev'], kcal: 280, protein: '6g', fat: '10g', carbs: '40g' },
      { day: 'Day 5', main: 'Chapati Roll with Paneer Bhurji', items: ['2 Wheat Rolls', 'Paneer Bhurji'], kcal: 380, protein: '15g', fat: '12g', carbs: '50g' },
      { day: 'Day 6', main: 'Lemon Rice + Chicken Curry', items: ['Lemon Rice', 'Home-style Chicken Curry'], kcal: 520, protein: '28g', fat: '15g', carbs: '70g' },
      { day: 'Day 7', main: 'Veg Pulao + Raita', items: ['Veg Pulao', 'Mixed Veg Raita'], kcal: 350, protein: '8g', fat: '7g', carbs: '65g' },
      { day: 'Day 8', main: 'Upma with Vegetables', items: ['Suji Upma', 'Seasonal Veggies', 'Peanuts'], kcal: 250, protein: '5g', fat: '6g', carbs: '45g' },
      { day: 'Day 9', main: 'Egg Curry + Rice', items: ['2 Eggs Curry', 'Steamed Rice'], kcal: 480, protein: '22g', fat: '14g', carbs: '65g' },
      { day: 'Day 10', main: 'Chole Sabji + 2 Rotis', items: ['Masala Chole', '2 Soft Rotis', 'Pickle'], kcal: 420, protein: '14g', fat: '10g', carbs: '68g' },
    ]
  },
  'healthy': {
    id: 'healthy',
    title: 'Healthy Corner',
    meta: 'Protein & Wellness',
    desc: 'Scientifically designed low-carb, high-protein meals to fuel your fitness journey without compromising on taste.',
    price: '₹140',
    unit: 'per meal',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-secondary/5',
    tagColor: 'bg-secondary',
    meals: [
      { day: 'Day 1', main: 'Grilled Chicken + Sautéed Veggies', items: ['Grilled Breast', 'Broccoli', 'Bell Peppers'], kcal: 350, protein: '35g', fat: '8g', carbs: '15g' },
      { day: 'Day 2', main: 'Oats Vegetable Khichdi', items: ['Steel Cut Oats', 'Mixed Vegetables', 'Moong Dal'], kcal: 280, protein: '10g', fat: '5g', carbs: '48g' },
      { day: 'Day 3', main: 'Millet Upma', items: ['Foxtail Millet', 'Veggies', 'Curry Leaves'], kcal: 220, protein: '6g', fat: '4g', carbs: '42g' },
      { day: 'Day 4', main: 'Brown Rice + Rajma', items: ['Brown Basmati', 'Protein Rajma'], kcal: 380, protein: '16g', fat: '4g', carbs: '70g' },
      { day: 'Day 5', main: 'Sprouts Salad Bowl', items: ['Moong Sprouts', 'Cucumber', 'Tomato', 'Lemon'], kcal: 180, protein: '12g', fat: '2g', carbs: '28g' },
      { day: 'Day 6', main: 'Moong Dal Chilla + Mint Chutney', items: ['2 Chillas', 'Pudina Chutney'], kcal: 210, protein: '12g', fat: '6g', carbs: '28g' },
      { day: 'Day 7', main: 'Quinoa Pulao', items: ['Organic Quinoa', 'Steamed Veggies'], kcal: 290, protein: '10g', fat: '6g', carbs: '50g' },
      { day: 'Day 8', main: 'Paneer Salad Wrap', items: ['Whole Wheat Wrap', 'Fresh Paneer', 'Greens'], kcal: 320, protein: '18g', fat: '10g', carbs: '35g' },
      { day: 'Day 9', main: 'Boiled Egg Sandwich on Multigrain', items: ['2 Eggs', 'Multigrain Bread', 'Spinach'], kcal: 310, protein: '18g', fat: '9g', carbs: '38g' },
      { day: 'Day 10', main: 'Greek Yogurt Fruit Bowl', items: ['Greek Yogurt', 'Seasonal Fruits', 'Seeds'], kcal: 220, protein: '15g', fat: '4g', carbs: '32g' },
    ]
  },
  'elderly': {
    id: 'elderly',
    title: 'Elderly Care',
    meta: 'Soft & Nutrient Dense',
    desc: 'Easy-to-digest, low-sodium meals tailored for senior citizens. Gentle on the stomach, high on nutrition.',
    price: '₹120',
    unit: 'per meal',
    img: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-accent/5',
    tagColor: 'bg-accent',
    meals: [
      { day: 'Day 1', main: 'Soft Moong Dal Khichdi', items: ['Overcooked Khichdi', 'Pure Ghee'], kcal: 280, protein: '9g', fat: '5g', carbs: '48g' },
      { day: 'Day 2', main: 'Daliya Porridge', items: ['Wheat Daliya', 'Milk/Veggie base'], kcal: 240, protein: '8g', fat: '4g', carbs: '45g' },
      { day: 'Day 3', main: 'Lauki Chana Dal + Soft Roti', items: ['Lauki Chana Dal', '1 Soft Roti'], kcal: 310, protein: '11g', fat: '6g', carbs: '52g' },
      { day: 'Day 4', main: 'Idli + Sambar', items: ['2 Steam Idlis', 'Veggie Sambar'], kcal: 220, protein: '6g', fat: '2g', carbs: '45g' },
      { day: 'Day 5', main: 'Curd Rice', items: ['Soft Rice', 'Temper Curd', 'Pomegranate'], kcal: 260, protein: '7g', fat: '6g', carbs: '45g' },
      { day: 'Day 6', main: 'Suji Upma', items: ['Soft Roasted Rava', 'Finely Cut Veggies'], kcal: 210, protein: '5g', fat: '4g', carbs: '40g' },
      { day: 'Day 7', main: 'Vegetable Stew + Rice', items: ['Creamy Veg Stew', 'Steamed Rice'], kcal: 320, protein: '7g', fat: '8g', carbs: '55g' },
      { day: 'Day 8', main: 'Mashed Potato with Dal Rice', items: ['Yellow Dal', 'Rice', 'Aloo Chokha'], kcal: 350, protein: '10g', fat: '8g', carbs: '60g' },
      { day: 'Day 9', main: 'Oats Porridge with Banana', items: ['Milk Oats', '1 Mashed Banana'], kcal: 280, protein: '8g', fat: '5g', carbs: '50g' },
      { day: 'Day 10', main: 'Soft Paneer Curry + Phulka', items: ['Narm Paneer', '1 Soft Phulka'], kcal: 340, protein: '16g', fat: '12g', carbs: '45g' },
    ]
  },
  'artisanal': {
    id: 'artisanal',
    title: 'Artisanal Selection',
    meta: 'Gourmet home-cooked',
    desc: 'Chef-crafted experimental meals. Global techniques meet local ingredients for an unparalleled home dining experience.',
    price: '₹180',
    unit: 'per meal',
    img: 'https://images.unsplash.com/photo-1547928501-a20245053cfd?auto=format&fit=crop&q=80&w=800',
    accent: 'bg-primary/5',
    tagColor: 'bg-primary',
    meals: [
      { day: 'Day 1', main: 'Sourdough Sandwich with Grilled Veggies', items: ['Sourdough Bread', 'Grilled Zucchini', 'Bell Peppers', 'Pesto'], kcal: 420, protein: '14g', fat: '12g', carbs: '55g' },
      { day: 'Day 2', main: 'Truffle Mushroom Pasta', items: ['Handmade Pasta', 'Wild Mushrooms', 'Truffle Oil', 'Parmesan'], kcal: 580, protein: '18g', fat: '24g', carbs: '65g' },
      { day: 'Day 3', main: 'Herb Butter Grilled Chicken', items: ['Chicken Breast', 'Herb Butter', 'Roasted Carrots', 'Green Beans'], kcal: 450, protein: '38g', fat: '28g', carbs: '12g' },
      { day: 'Day 4', main: 'Pesto Paneer Toast', items: ['Artisanal Toast', 'Marinated Paneer', 'Basil Pesto'], kcal: 380, protein: '20g', fat: '22g', carbs: '25g' },
      { day: 'Day 5', main: 'Roasted Tomato Soup + Garlic Bread', items: ['Slow-roasted Tomato Soup', 'Sourdough Garlic Bread'], kcal: 320, protein: '9g', fat: '14g', carbs: '42g' },
      { day: 'Day 6', main: 'Handmade Ravioli', items: ['Spinach & Ricotta Ravioli', 'Sage Butter Sauce'], kcal: 520, protein: '16g', fat: '18g', carbs: '68g' },
      { day: 'Day 7', main: 'Smoked Cheese and Chicken Sandwich', items: ['Multi-grain Bread', 'Smoked Chicken', 'Provolone'], kcal: 490, protein: '28g', fat: '24g', carbs: '38g' },
      { day: 'Day 8', main: 'Classic Mac and Cheese', items: ['Elbow Pasta', '4-Cheese Blend', 'Breadcrumbs'], kcal: 620, protein: '22g', fat: '32g', carbs: '70g' },
      { day: 'Day 9', main: 'Quinoa and Roasted Beet Salad', items: ['Organic Quinoa', 'Roasted Beets', 'Feta', 'Walnuts'], kcal: 310, protein: '11g', fat: '14g', carbs: '38g' },
      { day: 'Day 10', main: 'Spinach and Ricotta Cannelloni', items: ['Fresh Pasta Sheets', 'Ricotta Filling', 'Pomodoro Sauce'], kcal: 480, protein: '20g', fat: '22g', carbs: '52g' },
    ]
  }
};

const REGIONAL_DISHES_DATA: Record<string, { name: string, price: number, kcal: number, p: string, f: string, c: string }[]> = {
  'East Indian': [
    { name: 'Luchi + Aloor Dom', price: 120, kcal: 450, p: '8g', f: '22g', c: '55g' },
    { name: 'Shorshe Ilish + Rice', price: 350, kcal: 620, p: '32g', f: '35g', c: '45g' },
    { name: 'Cholar Dal + Pulao', price: 160, kcal: 520, p: '15g', f: '14g', c: '85g' },
    { name: 'Begun Bhaja + Dal + Rice', price: 140, kcal: 480, p: '12g', f: '18g', c: '68g' },
    { name: 'Mutton Kosha + Paratha', price: 320, kcal: 750, p: '38g', f: '42g', c: '55g' },
    { name: 'Macher Jhol + Rice', price: 220, kcal: 510, p: '28g', f: '14g', c: '65g' },
    { name: 'Chicken Rezala + Pulao', price: 280, kcal: 680, p: '34g', f: '28g', c: '72g' },
    { name: 'Macher Ghanto + Rice', price: 180, kcal: 490, p: '24g', f: '16g', c: '60g' },
    { name: 'Basanti Pulao + Paneer Curry', price: 240, kcal: 610, p: '18g', f: '22g', c: '88g' },
    { name: 'Tomato Chutney + Bhaja + Rice + Dal', price: 150, kcal: 460, p: '10g', f: '12g', c: '78g' },
  ],
  'North Indian': [
    { name: 'Rajma Chawal', price: 140, kcal: 520, p: '18g', f: '12g', c: '85g' },
    { name: 'Chole Bhature', price: 160, kcal: 680, p: '14g', f: '32g', c: '88g' },
    { name: 'Aloo Paratha + Curd', price: 110, kcal: 480, p: '10g', f: '18g', c: '72g' },
    { name: 'Paneer Butter Masala + Naan', price: 260, kcal: 720, p: '24g', f: '38g', c: '75g' },
    { name: 'Dal Makhani + Jeera Rice', price: 180, kcal: 580, p: '16g', f: '24g', c: '78g' },
    { name: 'Kadhi Chawal', price: 130, kcal: 450, p: '12g', f: '14g', c: '70g' },
    { name: 'Bhindi Masala + Roti', price: 120, kcal: 380, p: '9g', f: '16g', c: '55g' },
    { name: 'Butter Chicken + Rice', price: 280, kcal: 780, p: '36g', f: '42g', c: '65g' },
    { name: 'Palak Paneer + Chapati', price: 220, kcal: 540, p: '22g', f: '28g', c: '52g' },
    { name: 'Veg Biryani + Raita', price: 190, kcal: 620, p: '14g', f: '22g', c: '92g' },
  ],
  'South Indian': [
    { name: 'Idli + Sambar', price: 90, kcal: 320, p: '12g', f: '4g', c: '60g' },
    { name: 'Dosa + Coconut Chutney', price: 110, kcal: 410, p: '8g', f: '18g', c: '58g' },
    { name: 'Tamarind Rice', price: 100, kcal: 450, p: '6g', f: '15g', c: '75g' },
    { name: 'Curd Rice', price: 90, kcal: 380, p: '9g', f: '12g', c: '65g' },
    { name: 'Lemon Rice + Spicy Tomato Chutney', price: 110, kcal: 440, p: '7g', f: '15g', c: '72g' },
    { name: 'Vegetable Uttapam', price: 120, kcal: 360, p: '9g', f: '12g', c: '58g' },
    { name: 'Rasam Rice', price: 80, kcal: 340, p: '6g', f: '8g', c: '62g' },
    { name: 'Appam + Vegetable Stew', price: 160, kcal: 380, p: '10g', f: '18g', c: '50g' },
    { name: 'Pongal + Chutney', price: 100, kcal: 490, p: '12g', f: '16g', c: '75g' },
    { name: 'Chicken Chettinad + Rice', price: 260, kcal: 650, p: '34g', f: '28g', c: '65g' },
  ],
  'Artisanal': [
    { name: 'Sourdough Sandwich with Grilled Veggies', price: 220, kcal: 380, p: '12g', f: '14g', c: '55g' },
    { name: 'Truffle Mushroom Pasta', price: 350, kcal: 580, p: '18g', f: '28g', c: '68g' },
    { name: 'Herb Butter Grilled Chicken', price: 320, kcal: 490, p: '42g', f: '32g', c: '12g' },
    { name: 'Pesto Paneer Toast', price: 240, kcal: 420, p: '22g', f: '28g', c: '25g' },
    { name: 'Roasted Tomato Soup + Garlic Bread', price: 180, kcal: 310, p: '9g', f: '12g', c: '48g' },
    { name: 'Handmade Ravioli', price: 380, kcal: 540, p: '16g', f: '22g', c: '72g' },
    { name: 'Smoked Cheese and Chicken Sandwich', price: 280, kcal: 520, p: '26g', f: '28g', c: '42g' },
    { name: 'Classic Mac and Cheese', price: 240, kcal: 610, p: '18g', f: '32g', c: '65g' },
  ]
};

const SiteHeader = ({ cartCount, onCartClick, onScreenClick }: { cartCount: number, onCartClick: () => void, onScreenClick: (s: Screen) => void }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-6 md:px-12 py-5 flex justify-between items-center border-b border-surface-dim/30">
      <div className="flex items-center gap-8">
        <h1 
          onClick={() => onScreenClick('home')}
          className="text-2xl font-black font-display text-primary cursor-pointer tracking-tight"
        >
          Mealyvore
        </h1>
        <nav className="hidden md:flex items-center gap-6">
          <button className="text-sm font-semibold text-on-surface hover:text-primary transition-colors border-b-2 border-primary pb-1">Explore</button>
          <button onClick={() => onScreenClick('plan-listing')} className="text-sm font-medium text-on-surface/70 hover:text-primary transition-colors pb-1">Meal Plans</button>
          <button className="text-sm font-medium text-on-surface/70 hover:text-primary transition-colors pb-1">Become a Chef</button>
        </nav>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <button className="p-2 text-on-surface hover:text-primary transition-colors hidden md:block">
          <MapPin size={22} strokeWidth={1.5} />
        </button>
        <button onClick={onCartClick} className="p-2 text-on-surface hover:text-primary transition-colors relative">
          <motion.div
            key={cartCount}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1.5 right-1 w-4 h-4 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.div>
        </button>
        <button onClick={() => onScreenClick('profile')} className="w-9 h-9 rounded-full overflow-hidden border border-surface-dim group active:scale-95 transition-all">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover group-hover:scale-110 transition-transform" referrerPolicy="no-referrer" />
        </button>
      </div>
    </header>
  );
};

const SiteFooter = ({ onScreenClick }: { onScreenClick: (s: Screen) => void }) => {
  return (
    <footer className="bg-[#EEEAE1] pt-20 pb-12 px-6 md:px-12 border-t border-surface-dim">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4 space-y-6">
          <h2 className="text-2xl font-black font-display text-primary uppercase">Mealyvore</h2>
          <p className="text-sm text-on-surface/60 max-w-xs leading-relaxed font-medium">
            © 2024 Mealyvore. Nourishing communities, one kitchen at a time. Authenticity delivered from your neighbor's home to yours.
          </p>
          <div className="flex gap-4">
            {[Instagram, Facebook, MessageSquare, MapPin].map((Icon, idx) => (
              <button key={idx} className="p-2 hover:text-primary transition-colors text-on-surface/40">
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40 mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm font-medium text-on-surface/70">
              <li className="hover:text-primary cursor-pointer" onClick={() => onScreenClick('home')}>Explore Chefs</li>
              <li className="hover:text-primary cursor-pointer" onClick={() => onScreenClick('plan-menu')}>Meal Plans</li>
              <li className="hover:text-primary cursor-pointer">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40 mb-6">Safety & Trust</h4>
            <ul className="space-y-4 text-sm font-medium text-on-surface/70">
              <li className="hover:text-primary cursor-pointer">Hygiene Standards</li>
              <li className="hover:text-primary cursor-pointer">Trust & Safety</li>
              <li className="hover:text-primary cursor-pointer">Chef Partners</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40 mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-on-surface/70">
              <li className="hover:text-primary cursor-pointer">Support Center</li>
              <li className="hover:text-primary cursor-pointer">Download App</li>
              <li className="hover:text-primary cursor-pointer">FAQ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};


// --- Screens ---

const PlanListingScreen = ({ onPlanClick }: { onPlanClick: (id: string) => void }) => {
  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <header className="px-6 md:px-12 lg:px-24 pt-16 pb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black font-display text-primary tracking-tight leading-none uppercase text-center md:text-left">Meal Plans</h1>
        <p className="text-sm font-black text-on-surface/40 tracking-[0.2em] mt-4 text-center md:text-left">Curated subscriptions for your lifestyle</p>
      </header>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {Object.values(PLANS_DATA).map((plan) => (
          <div 
            key={plan.id}
            onClick={() => onPlanClick(plan.id)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl mb-6">
              <img src={plan.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={plan.title} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className={`${plan.tagColor} text-white text-[8px] font-black px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-widest`}>
                  {plan.meta}
                </span>
                <h3 className="text-3xl font-black font-display text-white leading-tight mb-2">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-white">{plan.price}</span>
                  <span className="text-[10px] font-bold text-white/50 uppercase">/{plan.unit}</span>
                </div>
              </div>
            </div>
            <button className="w-full py-5 bg-white border border-surface-dim rounded-2xl text-[10px] font-black tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
              EXPLORE MENU
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PlanMenuScreen = ({ planId, onBack }: { planId: string, onBack: () => void }) => {
  const plan = PLANS_DATA[planId as keyof typeof PLANS_DATA] || PLANS_DATA['tiffin'];
  
  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <img src={plan.img} className="w-full h-full object-cover" alt={plan.title} referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 text-white">
          <button onClick={onBack} className="mb-8 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase hover:gap-4 transition-all bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft size={14} /> Back to Plans
          </button>
          <span className={`${plan.tagColor} text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 inline-block uppercase tracking-widest`}>{plan.meta}</span>
          <h1 className="text-5xl md:text-7xl font-black font-display tracking-tight leading-none mb-4">{plan.title}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl font-medium leading-relaxed italic normal-case">"{plan.desc}"</p>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-20">
          <section>
            <div className="flex items-center justify-between mb-12 border-b-2 border-surface-dim pb-6">
              <h3 className="text-3xl font-black font-display text-primary flex items-center gap-4 uppercase tracking-tighter">
                <Soup size={32} />
                Detailed Menu
              </h3>
              <div className="text-[10px] font-black text-on-surface/30 tracking-[0.2em] uppercase">Rotation Preview</div>
            </div>
            
            <div className="space-y-12">
              {plan.meals.map((meal) => (
                <div key={meal.day} className={`p-10 rounded-[3rem] border border-surface-dim shadow-sm hover:shadow-xl transition-all duration-500 bg-white group`}>
                  <div className="flex flex-col md:flex-row justify-between mb-8 gap-6">
                    <div>
                      <span className="text-[10px] font-black text-primary tracking-[0.3em] mb-2 block">{meal.day.toUpperCase()}</span>
                      <h4 className="text-2xl font-black font-display text-on-surface uppercase group-hover:text-primary transition-colors">{meal.main}</h4>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <h5 className="text-[10px] font-black text-on-surface/40 tracking-widest">WHAT'S INSIDE</h5>
                      <div className="flex flex-wrap gap-2">
                        {meal.items.map(item => (
                          <span key={item} className="px-3 py-1.5 bg-surface-dim/10 rounded-xl text-[10px] font-bold text-on-surface/70 border border-surface-dim/20">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <h5 className="text-[10px] font-black text-on-surface/40 tracking-widest">NUTRITIONAL VALUE</h5>
                      <div className="grid grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-lg font-black font-display text-primary leading-none">{meal.kcal}</div>
                          <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">kcal</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black font-display text-on-surface leading-none">{(meal as any).protein}</div>
                          <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">protein</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black font-display text-on-surface leading-none">{(meal as any).fat}</div>
                          <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">fats</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-black font-display text-on-surface leading-none">{(meal as any).carbs}</div>
                          <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">carbs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-secondary/5 p-12 rounded-[3.5rem] border border-secondary/10 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-2xl font-black font-display text-secondary mb-6 flex items-center gap-4 uppercase tracking-tight">
                <ShieldCheck size={32} />
                Artisanal Guarantee
              </h4>
              <p className="text-sm text-on-surface/70 leading-relaxed font-bold normal-case">
                These plans are rotating menus curated by senior nutritionists and prepared by our top-rated home chefs. We use cold-pressed mustard oil, A2 cow ghee, and organically sourced grains. No refined flour (Maida) or white sugar is used in any of these preparations.
              </p>
            </div>
            <ChefHat size={160} className="absolute -bottom-10 -right-10 text-secondary opacity-[0.05] rotate-12" />
          </section>
        </div>

        <aside className="lg:col-span-4">
          <div className="bg-white p-10 rounded-[3.5rem] border border-surface-dim shadow-2xl space-y-10 lg:sticky lg:top-32">
            <div>
              <span className="text-[10px] font-black uppercase text-on-surface/40 tracking-[0.2em]">Investment</span>
              <div className="flex items-end gap-1 mt-4">
                <span className="text-6xl font-black font-display text-primary tracking-tighter">{plan.price}</span>
                <span className="text-sm font-black mb-2 text-on-surface/40 uppercase">/{plan.unit}</span>
              </div>
              <p className="text-[10px] font-black text-secondary mt-2 tracking-widest">MIN. 5 MEAL COMMITMENT</p>
            </div>

            <div className="space-y-4">
              <button className="w-full py-6 bg-primary text-white rounded-2xl font-black shadow-xl hover:bg-primary/90 transition-all active:scale-[0.98] uppercase tracking-widest">
                Start Subscription
              </button>
              <button className="w-full py-5 rounded-2xl border-2 border-primary/20 text-primary font-black text-[10px] hover:bg-primary/5 transition-all uppercase tracking-widest">
                Gift to a neighbor
              </button>
            </div>

            <div className="pt-8 border-t border-surface-dim flex items-start gap-4">
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={28} className="text-secondary" />
              </div>
              <div>
                <h5 className="text-[10px] font-black text-on-surface mb-2 uppercase tracking-widest">Pure Hygiene</h5>
                <p className="text-[10px] font-bold text-on-surface/40 leading-relaxed normal-case italic">
                  Weekly spot-checks for kitchen hygiene. Transparent sourcing. No compromise.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const RegionMenuScreen = ({ region, onBack, onAddToCart }: { region: string, onBack: () => void, onAddToCart: (item: any) => void }) => {
  const dishes = REGIONAL_DISHES_DATA[region] || [];
  
  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <header className="px-6 md:px-12 lg:px-24 pt-16 pb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <button onClick={onBack} className="mb-8 flex items-center gap-2 text-[10px] font-black tracking-widest uppercase hover:gap-4 transition-all text-primary">
            <ArrowLeft size={14} /> Back to Explore
          </button>
          <h1 className="text-4xl md:text-6xl font-black font-display text-primary tracking-tight leading-none uppercase">{region}</h1>
          <p className="text-sm font-black text-on-surface/40 tracking-[0.2em] mt-4 uppercase">Handpicked Regional Specialities</p>
        </div>
      </header>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {dishes.map((dish) => (
          <div key={dish.name} className="bg-white p-8 rounded-[2.5rem] border border-surface-dim shadow-sm group hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl md:text-2xl font-black font-display text-on-surface leading-tight flex-1 pr-4">{dish.name}</h3>
              <span className="text-2xl font-black text-primary tracking-tighter shrink-0">₹{dish.price}</span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8 bg-surface-dim/10 p-4 rounded-2xl border border-surface-dim/20">
              <div className="text-center">
                <div className="text-lg font-black font-display text-primary leading-none">{dish.kcal}</div>
                <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">kcal</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black font-display text-on-surface leading-none">{dish.p}</div>
                <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">protein</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black font-display text-on-surface leading-none">{dish.f}</div>
                <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">fats</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-black font-display text-on-surface leading-none">{dish.c}</div>
                <div className="text-[8px] font-black text-on-surface/30 uppercase mt-1">carbs</div>
              </div>
            </div>

            <button 
              onClick={() => onAddToCart({
                id: `regional-${dish.name}`,
                name: dish.name,
                price: dish.price,
                quantity: 1,
                chefName: 'Regional Special'
              })}
              className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg uppercase"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomeScreen = ({ onChefClick, onPlanClick, onRegionClick }: { onChefClick: (id: string) => void, onPlanClick: (id: string) => void, onRegionClick: (r: string) => void }) => {
  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Traditional Indian Meal" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-1.5 bg-secondary/15 backdrop-blur-md rounded-full text-secondary text-xs md:text-sm font-bold border border-white/20 mb-6 flex items-center gap-3 w-fit">
              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              Hyperlocal • Handcrafted • Home-cooked
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-display text-white leading-[0.95] tracking-tight mb-6">
              Ghar ka khana, <br className="hidden md:block" /> just around the corner.
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-xl mb-12 leading-relaxed">
              Authentic recipes from your neighbor's kitchen, delivered with the hygiene standards of a five-star hotel.
            </p>
            
            <div className="flex flex-col md:flex-row gap-0 bg-white rounded-2xl md:rounded-full p-2 w-full max-w-2xl shadow-2xl relative">
              <div className="flex-1 flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-surface-dim/30">
                <MapPin className="text-primary mr-3 shrink-0" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter your delivery location"
                  className="bg-transparent border-none outline-none w-full text-sm font-medium placeholder:text-on-surface/40"
                />
              </div>
              <button 
                className="bg-primary hover:bg-primary/90 text-white font-black px-10 py-5 rounded-xl md:rounded-full text-sm tracking-wide transition-all active:scale-[0.98] shadow-lg md:ml-2"
              >
                Find Food
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { 
              title: 'Hygiene Verified', 
              desc: 'Rigorous 20-point quality audits for every home kitchen.',
              icon: ShieldCheck, 
              bg: 'bg-secondary/10', 
              accent: 'text-secondary' 
            },
            { 
              title: 'Regional Flavors', 
              desc: 'Authentic family recipes delivered from local homes.',
              icon: UtensilsCrossed, 
              bg: 'bg-primary/10', 
              accent: 'text-primary' 
            },
            { 
              title: 'Kolkata Local', 
              desc: 'Proudly serving the heart of the City of Joy.',
              icon: MapPin, 
              bg: 'bg-accent/10', 
              accent: 'text-accent' 
            },
            { 
              title: 'Social Impact', 
              desc: 'Empowering talented home chefs in your neighborhood.',
              icon: Heart, 
              bg: 'bg-red-50', 
              accent: 'text-red-500' 
            }
          ].map((feat) => (
            <div 
              key={feat.title} 
              className="bg-white p-6 rounded-3xl border border-surface-dim/40 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className={`w-12 h-12 ${feat.bg} ${feat.accent} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                <feat.icon size={24} />
              </div>
              <h3 className="text-lg font-black font-display text-on-surface mb-2 leading-tight uppercase">{feat.title}</h3>
              <p className="text-[10px] text-on-surface/60 leading-relaxed font-bold uppercase tracking-tight">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Favorites */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto uppercase">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black font-display text-primary leading-none mb-4">Regional Favorites</h2>
            <p className="text-sm text-on-surface/50 tracking-wider">The soul of India, delivered to your doorstep.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {[
            { name: 'North Indian', img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=600' },
            { name: 'South Indian', img: 'https://images.unsplash.com/photo-1541014741259-df549fa9ba6f?auto=format&fit=crop&q=80&w=600' },
            { name: 'East Indian', img: 'https://images.unsplash.com/photo-1610450937667-03ba2925b390?auto=format&fit=crop&q=80&w=600' },
            { name: 'Artisanal', img: 'https://images.unsplash.com/photo-1601050690597-df056fb1779f?auto=format&fit=crop&q=80&w=600' }
          ].map((reg) => (
            <div 
              key={reg.name} 
              onClick={() => onRegionClick(reg.name)}
              className="relative aspect-[3/4] rounded-3xl overflow-hidden group cursor-pointer shadow-md"
            >
              <img src={reg.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={reg.name} referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-xl md:text-2xl font-black font-display text-white leading-tight">
                  {reg.name.split(' ')[0]} <br /> {reg.name.split(' ')[1]}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meet Your Neighbors */}
      <section className="py-24 bg-surface-dim/10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center mb-20 uppercase">
          <h2 className="text-4xl md:text-5xl font-black font-display text-primary leading-none mb-4">Meet Your Neighbors</h2>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              name: 'Chef Anita S.', 
              specialty: 'Dum Biryani', 
              rating: 4.9, 
              bio: 'Cooking is how I share my heritage. My Biryani recipe has been in the family for three generations.',
              tags: ['Spicy', 'Traditional'],
              img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
            },
            { 
              name: 'Chef Rahul M.', 
              specialty: 'Healthy Thalis', 
              rating: 4.8, 
              bio: 'I believe home food should be balanced. My thalis are low-oil and packed with seasonal veggies.',
              tags: ['Healthy', 'Vegetarian'],
              img: 'https://images.unsplash.com/photo-1583394838336-acd97773cfbf?auto=format&fit=crop&q=80&w=300'
            },
            { 
              name: 'Chef Priya K.', 
              specialty: 'Artisanal Breads', 
              rating: 5.0, 
              bio: 'Baking is a science and an art. I use organic grains to create the perfect sourdough and pastries.',
              tags: ['Organic', 'Handmade'],
              img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=300'
            }
          ].map((chef) => (
            <div 
              key={chef.name} 
              className="flex flex-col items-center text-center group cursor-pointer"
              onClick={() => onChefClick('auntie-meera')}
            >
              <div className="relative mb-8">
                <div className="w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-xl">
                  <img src={chef.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <div className="absolute bottom-0 right-0 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg flex items-center gap-1 ring-4 ring-white">
                  {chef.rating} <Star size={10} fill="currentColor" />
                </div>
              </div>
              <h3 className="text-2xl font-black font-display text-on-surface mb-1 leading-none uppercase">{chef.name}</h3>
              <p className="text-xs font-black text-primary/60 uppercase tracking-widest mb-4">Specialty: {chef.specialty}</p>
              <p className="text-sm text-on-surface/50 font-medium leading-relaxed italic mb-6 max-w-xs">
                "{chef.bio}"
              </p>
              <div className="flex gap-2">
                {chef.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-surface-dim/20 rounded-full border border-surface-dim/30">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Eat Your Way */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto uppercase">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-display text-primary leading-none mb-4">Eat Your Way</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Hungry now?', 
              desc: 'Ready-to-eat home meals delivered in 30 mins.', 
              action: 'Order Now', 
              img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
              bg: 'bg-[#5A7363]' 
            },
            { 
              title: 'Pre-orders', 
              desc: 'Planning a party? Book a chef for custom menus and bulk orders.', 
              action: 'Plan Event', 
              img: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=600',
              bg: 'bg-black' 
            },
            { 
              title: 'Tiffins', 
              desc: 'Missing mom’s cooking? Set up a daily meal subscription.', 
              action: 'Subscribe', 
              img: 'https://images.unsplash.com/photo-1547928501-a20245053cfd?auto=format&fit=crop&q=80&w=600',
              bg: 'bg-[#1D1B17]' 
            }
          ].map((cat) => (
            <div key={cat.title} className={`${cat.bg} relative rounded-3xl overflow-hidden flex flex-col items-center justify-center p-12 text-center h-[500px] gap-6 group hover:translate-y-[-10px] transition-all duration-500`}>
              <img src={cat.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <h3 className="text-3xl font-black font-display text-white leading-none">{cat.title}</h3>
                <p className="text-sm text-white/50 font-medium leading-relaxed max-w-[200px] mb-4 uppercase">{cat.desc}</p>
                <button className="bg-white text-on-surface px-8 py-3 rounded-full text-xs font-black tracking-widest hover:bg-primary transition-all active:scale-95 group-hover:px-12 group-hover:bg-primary group-hover:text-white">
                  {cat.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -ml-48 -mb-48" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black font-display leading-[0.95] tracking-tight uppercase">
              Join the neighborhood table
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
              Get updates on new home chefs, seasonal specials, and exclusive community discounts.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-8 py-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
              />
              <button className="bg-white text-primary px-10 py-5 rounded-2xl text-sm font-black tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg uppercase">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ChefProfile = ({ chefId, onBack, onDishClick, onAddToCart }: { chefId: string, onBack: () => void, onDishClick: () => void, onAddToCart: (item: any) => void }) => {
  const chef = CHEFS_DATA[chefId as keyof typeof CHEFS_DATA] || CHEFS_DATA['auntie-meera'];

  const handleAddToCart = (dish: any) => {
    const priceValue = parseInt(dish.price.replace('₹', ''));
    onAddToCart({
      id: `${chefId}-${dish.name}`,
      name: dish.name,
      price: priceValue,
      quantity: 1,
      chefName: chef.name,
      img: dish.img
    });
  };

  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={chef.headerImg} 
          className="w-full h-full object-cover" 
          alt="Chef Header" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40" />
        <button onClick={onBack} className="absolute top-8 left-6 md:left-12 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex items-end gap-8">
          <div className="w-40 h-40 rounded-3xl border-8 border-white shadow-2xl overflow-hidden bg-white hidden sm:block">
            <img src={chef.img} className="w-full h-full object-cover" alt="Profile" referrerPolicy="no-referrer" />
          </div>
          <div className="text-white pb-2">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-none">{chef.name}</h2>
              <span className="flex items-center gap-2 bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                <CheckCircle2 size={12} fill="currentColor" /> Kitchen Verified
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? 'currentColor' : 'none'} strokeWidth={2} />)}
              </div>
              <span className="text-sm font-black">{chef.rating} ({chef.reviews} Reviews)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20 max-w-7xl mx-auto">
        <div className="lg:col-span-8 space-y-20">
          <section className="bg-white p-12 rounded-[3rem] border border-surface-dim shadow-sm">
            <h3 className="text-2xl font-black font-display text-primary mb-8 tracking-widest">About the Chef</h3>
            <p className="text-lg text-on-surface/60 leading-relaxed font-medium normal-case">
              {chef.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {chef.specialties.map((spec) => (
                <div key={spec} className="bg-primary/5 px-6 py-3 rounded-2xl text-xs font-black text-primary border border-primary/10 tracking-widest">
                  {spec}
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black font-display text-primary leading-none mb-4 uppercase">Today's Menu</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {chef.menu.map((dish) => (
                <div 
                  key={dish.name} 
                  onClick={() => dish.name === 'Homemade Paneer Butter Masala' && onDishClick()}
                  className="bg-white overflow-hidden rounded-[2.5rem] border border-surface-dim shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 cursor-pointer group"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img src={dish.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={dish.name} referrerPolicy="no-referrer" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-secondary text-white text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">{dish.tag}</span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-black font-display leading-tight pr-4">{dish.name}</h4>
                        <span className="text-2xl font-black text-primary tracking-tighter">{dish.price}</span>
                      </div>
                      <p className="text-xs text-on-surface/40 font-medium normal-case line-clamp-2">{dish.meta}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(dish); }}
                        className="bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all"
                      >
                        Add to Cart
                      </button>
                      <button className="border-2 border-primary/20 text-primary py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 active:scale-95 transition-all">
                        Pre-order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ReviewSection subjectId={chef.id} />
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <section className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-xl h-fit">
            <h3 className="text-xl font-black font-display text-primary mb-8 tracking-widest uppercase">The Kitchen</h3>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {chef.kitchenPhotos.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-inner">
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt={`Kitchen ${idx}`} referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="bg-[#EEEAE1] p-6 rounded-3xl flex items-center gap-4 border border-surface-dim">
              <ShieldCheck className="text-secondary shrink-0" size={32} />
              <span className="text-[10px] font-black text-on-surface/60 leading-relaxed tracking-widest uppercase">FSSAI Registered & Hygiene Inspected</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

const CheckoutScreen = ({ cart, setCart, onBack, onClearCart, onOrderSuccess }: { cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>>, onBack: () => void, onClearCart: () => void, onOrderSuccess: () => void }) => {
  const [address, setAddress] = useState('12/A, Park Street, Kolkata - 700016');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 45;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + taxes;

  const handlePlaceOrder = () => {
    // Mock order placement
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: cart,
      total,
      status: 'In Kitchen',
      chefName: cart[0]?.chefName || 'Home Chef'
    };
    
    const existingOrders = JSON.parse(localStorage.getItem('mealyvore_orders') || '[]');
    localStorage.setItem('mealyvore_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    onClearCart();
    onOrderSuccess();
  };

  if (cart.length === 0) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center p-12 text-center uppercase">
        <div className="w-40 h-40 bg-surface-dim/20 rounded-full flex items-center justify-center mb-10 text-primary/30">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <h2 className="text-4xl font-black font-display text-on-surface mb-4 tracking-tight">Your table is empty</h2>
        <p className="text-on-surface/40 font-medium mb-10 max-w-xs normal-case italic">Add some home-cooked goodness to your cart to get started.</p>
        <button onClick={onBack} className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
          Start Exploring
        </button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <div className="px-6 md:px-12 lg:px-24 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black font-display text-primary tracking-tight leading-none uppercase text-center md:text-left">Checkout</h1>
            <p className="text-sm font-black text-on-surface/40 tracking-[0.2em] mt-4 text-center md:text-left">Safe & Secure Hyperlocal Delivery</p>
          </header>

          {/* Delivery Address */}
          <section className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-sm group">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black font-display text-on-surface tracking-widest flex items-center gap-4">
                <MapPin className="text-primary" size={24} />
                Delivery Area
              </h3>
              <button className="text-[10px] font-black text-primary border-b-2 border-primary/20 hover:border-primary transition-all">Change</button>
            </div>
            <div className="p-6 bg-surface-dim/20 rounded-2xl border border-surface-dim flex items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-secondary">
                <Navigation size={24} />
              </div>
              <p className="text-sm font-bold text-on-surface/70 normal-case leading-relaxed">
                {address}
              </p>
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-sm">
            <h3 className="text-xl font-black font-display text-on-surface tracking-widest flex items-center gap-4 mb-10">
              <ShoppingBag className="text-primary" size={24} />
              Your Selection
            </h3>
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="flex flex-col sm:flex-row gap-6 items-center group bg-surface-dim/5 p-4 rounded-3xl sm:bg-transparent sm:p-0"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border border-surface-dim/40 shrink-0 shadow-sm bg-surface-dim/20 flex items-center justify-center">
                      {item.img ? (
                        <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} referrerPolicy="no-referrer" />
                      ) : (
                        <Soup className="text-primary/40" size={32} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex justify-between items-start mb-1 gap-4">
                        <h4 className="text-lg font-black font-display text-on-surface truncate pr-4">{item.name}</h4>
                        <span className="text-xl font-black text-primary tracking-tighter shrink-0">₹{item.price * item.quantity}</span>
                      </div>
                      <p className="text-[10px] font-black text-on-surface/30 tracking-widest mb-4">By Chef {item.chefName}</p>
                      <div className="flex items-center justify-between sm:justify-start gap-6">
                        <div className="flex items-center gap-4 bg-surface-dim/20 px-3 py-1.5 rounded-xl">
                          <button 
                            onClick={() => {
                              setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: Math.max(1, c.quantity - 1) } : c));
                            }}
                            className="text-primary hover:scale-110 active:scale-90"
                          >
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => {
                              setCart(prev => prev.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
                            }}
                            className="text-primary hover:scale-110 active:scale-90"
                          >
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                        <button 
                          onClick={() => setCart(prev => prev.filter(c => c.id !== item.id))}
                          className="text-[10px] font-black text-on-surface/20 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-12 pt-10 border-t-2 border-dashed border-surface-dim/50 space-y-4">
              <div className="flex justify-between text-sm font-black text-on-surface/40 tracking-widest uppercase">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-on-surface/40 tracking-widest uppercase">
                <span>Delivery Partner Fee</span>
                <span className={delivery === 0 ? 'text-secondary font-bold' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-on-surface/40 tracking-widest uppercase">
                <span>Restaurant Taxes</span>
                <span>₹{taxes}</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-2xl space-y-10 lg:sticky lg:top-32">
            <div>
              <h3 className="text-xl font-black font-display text-on-surface tracking-widest mb-8 uppercase">Payment</h3>
              <div className="space-y-3">
                {[
                  { id: 'upi', label: 'UPI (Paytm/GPay)', icon: Smartphone },
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'cod', label: 'Cash on Delivery', icon: HandCoins }
                ].map((pm) => (
                  <button 
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all group ${
                      paymentMethod === pm.id ? 'border-primary bg-primary/5 shadow-inner' : 'border-surface-dim hover:border-primary/20'
                    }`}
                  >
                    <pm.icon size={24} className={paymentMethod === pm.id ? 'text-primary' : 'text-on-surface/20 group-hover:text-primary/40'} />
                    <span className={`text-[10px] font-black tracking-widest uppercase ${paymentMethod === pm.id ? 'text-primary' : 'text-on-surface/40'}`}>
                      {pm.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t-2 border-surface-dim space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-black text-on-surface/40 uppercase tracking-[0.2em]">Grand Total</span>
                <span className="text-5xl font-black font-display text-primary tracking-tighter">₹{total}</span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                Place Order <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const CartFAB = () => null;

const ReviewSection = ({ subjectId }: { subjectId: string }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  
  const initialReviews = [
    { id: 1, user: 'Rahul S.', rating: 5, comment: 'Absolutely divine! The flavors were so balanced and it felt truly home-cooked.', date: '2 days ago' },
    { id: 2, user: 'Anita M.', rating: 4, comment: 'Very tasty and hygiene was evident. Mealyvore never disappoints.', date: '5 days ago' },
  ];

  const [reviews, setReviews] = useState<any[]>(() => {
    const saved = localStorage.getItem(`mealyvore_reviews_${subjectId}`);
    return saved ? JSON.parse(saved) : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem(`mealyvore_reviews_${subjectId}`, JSON.stringify(reviews));
  }, [reviews, subjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;
    
    const newReview = {
      id: Date.now(),
      user: 'You',
      rating,
      comment,
      date: 'Just now'
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
  };

  const avgRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="mt-20 mb-20">
      <div className="flex items-center justify-between mb-10 border-b-2 border-surface-dim pb-6">
        <h3 className="text-2xl font-black font-display text-primary flex items-center gap-4 uppercase tracking-widest">
          <MessageSquare size={24} />
          Wall of Flavors
        </h3>
        <div className="flex items-center gap-3 bg-[#EEEAE1] px-5 py-2 rounded-2xl text-on-surface font-black text-xs tracking-widest">
          <Star size={18} fill="currentColor" className="text-accent" />
          <span>{avgRating} ({reviews.length} REVIEWS)</span>
        </div>
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-surface-dim mb-12 shadow-sm group">
        <h4 className="text-sm font-black font-display text-on-surface/40 mb-6 tracking-[0.2em] uppercase">Leave your review</h4>
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="transition-transform active:scale-95"
            >
              <Star 
                size={32} 
                className={star <= (hover || rating) ? 'text-accent' : 'text-surface-dim'} 
                fill={star <= (hover || rating) ? 'currentColor' : 'none'} 
                strokeWidth={2.5}
              />
            </button>
          ))}
        </div>
        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your home-cooked experience..."
            className="w-full bg-surface-dim/20 border-2 border-transparent focus:border-primary/20 rounded-3xl p-6 text-sm font-bold normal-case focus:bg-white outline-none min-h-[120px] transition-all placeholder:italic"
          />
          <button 
            type="submit"
            disabled={rating === 0 || !comment.trim()}
            className="absolute bottom-4 right-4 bg-primary text-white p-4 rounded-full disabled:opacity-20 transition-all hover:scale-110 active:scale-90 shadow-xl"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {/* Reviews List */}
      <div className="grid grid-cols-1 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white p-8 rounded-[2.5rem] border border-surface-dim shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#EEEAE1] rounded-full flex items-center justify-center text-primary font-black text-xs">
                  {rev.user.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black tracking-wider uppercase">{rev.user}</span>
                  <span className="text-[9px] font-black text-on-surface/30 tracking-[0.2em] uppercase">{rev.date}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < rev.rating ? 'currentColor' : 'none'} className={i < rev.rating ? 'text-accent' : 'text-surface-dim'} strokeWidth={2.5} />
                ))}
              </div>
            </div>
            <p className="text-sm text-on-surface/60 font-medium normal-case leading-relaxed italic">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const ItemDetail = ({ onBack, onChefClick, onAddToCart }: { onBack: () => void, onChefClick: (id: string) => void, onAddToCart: (item: any) => void }) => {
  const [amount, setAmount] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      id: `auntie-meera-Homemade Paneer Butter Masala`,
      name: 'Homemade Paneer Butter Masala',
      price: 280,
      quantity: amount,
      chefName: 'Auntie Meera',
      img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800'
    });
  };

  return (
    <div className="bg-surface min-h-screen pb-32">
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=2000" 
          className="w-full h-full object-cover" 
          alt="Dish" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <button onClick={onBack} className="absolute top-8 left-6 md:left-12 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all">
          <ArrowLeft size={24} />
        </button>
        <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 flex flex-wrap gap-4">
          <span className="bg-secondary text-white px-6 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-2xl">
            <CheckCircle2 size={14} fill="currentColor" /> FRESH TODAY
          </span>
          <span className="bg-white text-primary px-6 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-2xl">
            <Clock size={14} /> 35 MINS
          </span>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20 max-w-7xl mx-auto uppercase">
        <div className="lg:col-span-8 space-y-16">
          <header>
            <h1 className="text-4xl md:text-6xl font-black font-display text-on-surface mb-8 tracking-tight leading-none uppercase">Homemade Paneer <br /> Butter Masala</h1>
            <p className="text-lg md:text-xl text-on-surface/50 font-medium leading-relaxed normal-case max-w-2xl italic">
              "A rich, creamy, and mildly spicy classic made with soft, hand-pressed cottage cheese cubes simmered in a luscious tomato-butter gravy. No artificial colors or flavors."
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Low Oil', icon: Soup },
              { label: 'No Preservatives', icon: ShieldCheck },
              { label: 'Farm Fresh', icon: Sprout }
            ].map((box) => (
              <div key={box.label} className="bg-white p-8 rounded-[2rem] border border-surface-dim shadow-sm flex flex-col items-center justify-center text-center gap-4 group cursor-default hover:shadow-xl transition-all duration-500">
                <box.icon size={48} strokeWidth={1} className="text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black tracking-[0.2em]">{box.label}</span>
              </div>
            ))}
          </div>

          <section className="bg-white p-12 rounded-[3.5rem] border border-surface-dim shadow-xl">
            <h3 className="text-2xl font-black font-display text-primary mb-10 tracking-widest">Nutrition Facts</h3>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-16">
              <div className="text-center md:text-left">
                <span className="text-[10px] font-black text-on-surface/40 tracking-[0.2em]">Total Calories</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-7xl font-black font-display text-primary tracking-tighter">420</span>
                  <span className="text-sm font-black text-on-surface/40">kCAL</span>
                </div>
              </div>
              <div className="flex-1 w-full grid grid-cols-3 gap-10 md:border-l border-surface-dim md:pl-16">
                {[
                  { label: 'Protein', value: '18g', color: 'bg-primary' },
                  { label: 'Carbs', value: '12g', color: 'bg-secondary' },
                  { label: 'Fats', value: '32g', color: 'bg-accent' }
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-3">
                    <span className="text-[10px] font-black text-on-surface/40 tracking-[0.2em] uppercase">{stat.label}</span>
                    <span className="text-xl font-black font-display">{stat.value}</span>
                    <div className="h-1.5 w-full bg-surface-dim/30 rounded-full overflow-hidden mt-2">
                      <div className={`h-full ${stat.color} w-3/4`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <ReviewSection subjectId="homemade-paneer-butter-masala" />
        </div>

        <aside className="lg:col-span-4 space-y-12">
          <div className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-xl text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
              <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary/10 shadow-lg bg-[#EEEAE1]">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="text-xl font-black font-display text-on-surface leading-none mb-2">Auntie Meera</h4>
                <p className="text-[10px] font-black text-primary/60 tracking-widest uppercase">Expert Home Cook • 4.9 (2k+)</p>
              </div>
            </div>
            <button 
              onClick={() => onChefClick('auntie-meera')}
              className="w-full py-5 rounded-2xl border-2 border-primary/20 text-primary font-black text-[10px] tracking-widest uppercase hover:bg-primary/5 transition-all active:scale-[0.98]"
            >
              View Chef Profile
            </button>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-surface-dim shadow-2xl space-y-10 md:sticky md:top-32">
            <div>
              <span className="text-[10px] font-black text-on-surface/40 tracking-[0.2em]">Select Portion</span>
              <div className="flex items-center justify-between mt-6 bg-[#EEEAE1] rounded-2xl p-2 border border-surface-dim shadow-inner">
                <button 
                  onClick={() => amount > 1 && setAmount(a => a - 1)}
                  className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center hover:shadow-lg transition-all active:scale-90"
                >
                  <Minus size={24} />
                </button>
                <span className="text-3xl font-black font-display w-12 text-center">{amount}</span>
                <button 
                  onClick={() => setAmount(a => a + 1)}
                  className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 active:scale-90 transition-all"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-sm font-black text-on-surface/40 uppercase tracking-[0.2em]">Subtotal</span>
                <span className="text-4xl font-black font-display text-primary tracking-tighter">₹{280 * amount}</span>
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-xl hover:bg-primary/90 active:scale-[0.98] transition-all"
              >
                Add to Cart
              </button>
              <button className="w-full py-5 bg-secondary text-white rounded-2xl font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-4 hover:opacity-90 active:scale-[0.98] transition-all">
                <Calendar size={20} /> Subscription
              </button>
            </div>
            <p className="text-center text-[10px] font-black text-on-surface/30 tracking-[0.1em] leading-relaxed uppercase">
              Fast-tracked hyperlocal <br /> delivery within 45 mins.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const OrdersScreen = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('mealyvore_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <header className="px-6 md:px-12 lg:px-24 pt-16 pb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black font-display text-primary tracking-tight leading-none uppercase text-center md:text-left">Your Table</h1>
        <p className="text-sm font-black text-on-surface/40 tracking-[0.2em] mt-4 text-center md:text-left">Tracking your home-cooked journeys</p>
      </header>

      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <div className="flex gap-8 border-b-2 border-surface-dim mb-12">
          <button 
            onClick={() => setActiveTab('active')}
            className={`pb-4 text-xs font-black tracking-widest transition-all ${activeTab === 'active' ? 'text-primary border-b-4 border-primary' : 'text-on-surface/30'}`}
          >
            ACTIVE ORDERS
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-4 text-xs font-black tracking-widest transition-all ${activeTab === 'history' ? 'text-primary border-b-4 border-primary' : 'text-on-surface/30'}`}
          >
            PAST MEALS
          </button>
        </div>

        {activeTab === 'active' ? (
          <div className="space-y-8">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-8 md:p-12 rounded-[3rem] border border-surface-dim shadow-sm group hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col md:flex-row justify-between gap-10">
                    <div className="space-y-6 flex-1">
                      <div className="flex items-center gap-4">
                        <span className="bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest shadow-lg">
                          {order.status.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-black text-on-surface/30 tracking-widest">ID: {order.id}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black font-display text-on-surface leading-tight">
                        {order.items.map((i: any) => i.name).join(', ')}
                      </h3>
                      <div className="flex flex-wrap gap-8 pt-4">
                        <div className="flex items-center gap-3">
                          <ChefHat size={18} className="text-primary" />
                          <span className="text-[10px] font-black tracking-widest text-on-surface/60">CHEF {order.chefName.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock size={18} className="text-primary" />
                          <span className="text-[10px] font-black tracking-widest text-on-surface/60">ETA: 25 MINS</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CreditCard size={18} className="text-primary" />
                          <span className="text-[10px] font-black tracking-widest text-on-surface/60">₹{order.total} PAID</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-64 aspect-video md:aspect-square rounded-[2rem] overflow-hidden border border-surface-dim shadow-inner shrink-0">
                      <img src={order.items[0]?.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Dish" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="mt-10 pt-10 border-t border-surface-dim flex gap-4">
                    <button className="flex-1 py-4 bg-primary text-white rounded-2xl font-black text-[10px] tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg">TRACK LIVE</button>
                    <button className="flex-1 py-4 border-2 border-primary/20 text-primary rounded-2xl font-black text-[10px] tracking-widest hover:bg-primary/5 active:scale-95 transition-all">CALL CHEF</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center space-y-8">
                <div className="w-32 h-32 bg-surface-dim/20 rounded-full flex items-center justify-center mx-auto text-primary/20">
                  <Utensils size={48} strokeWidth={1} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black font-display text-on-surface tracking-widest">NO FEASTS IN PROGRESS</h3>
                  <p className="text-sm text-on-surface/40 font-medium normal-case italic">Your active orders will appear here once placed.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-surface-dim opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 flex gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-surface-dim">
                  <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between">
                    <span className="text-[8px] font-black tracking-widest text-on-surface/40">12 MAY 2024</span>
                    <span className="text-[8px] font-black tracking-widest text-secondary">DELIVERED</span>
                  </div>
                  <h4 className="text-lg font-black font-display">Paneer Butter Masala</h4>
                  <p className="text-[10px] font-black text-primary tracking-tighter">₹280</p>
                  <button className="text-[10px] font-black text-primary border-b-2 border-primary/20 hover:border-primary transition-all pt-2">REORDER</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ onBack }: { onBack: () => void }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('mealyvore_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      phone: '+91 98765 43210',
      address: 'Apt 4B, Park Street, Kolkata, West Bengal - 700016'
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleSave = () => {
    setProfile(tempProfile);
    localStorage.setItem('mealyvore_profile', JSON.stringify(tempProfile));
    setIsEditing(false);
  };

  return (
    <div className="pb-32 bg-surface min-h-screen uppercase">
      <header className="px-6 md:px-12 lg:px-24 pt-16 pb-12 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black font-display text-primary tracking-tight leading-none uppercase text-center md:text-left">Account</h1>
        <p className="text-sm font-black text-on-surface/40 tracking-[0.2em] mt-4 text-center md:text-left">Member Profile & Preferences</p>
      </header>

      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-surface-dim shadow-sm space-y-16">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-32 md:w-40 h-32 md:h-40 rounded-full bg-[#EEEAE1] flex items-center justify-center border-8 border-white shadow-xl relative overflow-hidden">
                <User size={64} className="text-primary/20" />
              </div>
              <button className="absolute bottom-2 right-2 bg-primary text-white p-3 rounded-full shadow-2xl border-4 border-white hover:scale-110 active:scale-90 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-3xl font-black font-display text-on-surface tracking-tight">{profile.name}</h3>
              <p className="text-[10px] font-black text-primary/60 tracking-widest">Mealyvore Foodie • Level 4 Artisan</p>
              <div className="flex gap-4 pt-4 justify-center md:justify-start">
                <div className="bg-[#EEEAE1] px-4 py-2 rounded-xl text-[10px] font-black tracking-widest text-on-surface/40">128 Orders</div>
                <div className="bg-[#EEEAE1] px-4 py-2 rounded-xl text-[10px] font-black tracking-widest text-on-surface/40">12 Reviews</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 border-t-2 border-surface-dim pt-16">
            <div className="space-y-8">
              <div className="flex justify-between items-end mb-4">
                <h4 className="text-xl font-black font-display text-primary tracking-widest uppercase">Personal Details</h4>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[10px] font-black text-primary border-b-2 border-primary/20 hover:border-primary transition-all"
                >
                  {isEditing ? 'DISCARD' : 'EDIT PROFILE'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-on-surface/30 tracking-[0.2em] pl-1">Full Name</label>
                  <input 
                    type="text" 
                    value={isEditing ? tempProfile.name : profile.name}
                    readOnly={!isEditing}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all font-bold text-sm outline-none ${
                      isEditing ? 'border-primary bg-primary/5 focus:shadow-xl' : 'border-surface-dim bg-surface/30 normal-case'
                    }`}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-on-surface/30 tracking-[0.2em] pl-1">Phone Contact</label>
                  <input 
                    type="tel" 
                    value={isEditing ? tempProfile.phone : profile.phone}
                    readOnly={!isEditing}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all font-bold text-sm outline-none ${
                      isEditing ? 'border-primary bg-primary/5 focus:shadow-xl' : 'border-surface-dim bg-surface/30 normal-case'
                    }`}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-on-surface/30 tracking-[0.2em] pl-1">Email ID</label>
                  <input 
                    type="email" 
                    value={isEditing ? tempProfile.email : profile.email}
                    readOnly={!isEditing}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all font-bold text-sm outline-none ${
                      isEditing ? 'border-primary bg-primary/5 focus:shadow-xl' : 'border-surface-dim bg-surface/30 normal-case'
                    }`}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <label className="text-[10px] font-black text-on-surface/30 tracking-[0.2em] pl-1">Primary Address</label>
                  <textarea 
                    value={isEditing ? tempProfile.address : profile.address}
                    readOnly={!isEditing}
                    onChange={(e) => setTempProfile({ ...tempProfile, address: e.target.value })}
                    className={`w-full px-6 py-5 rounded-2xl border-2 transition-all font-bold text-sm outline-none min-h-[120px] resize-none ${
                      isEditing ? 'border-primary bg-primary/5 focus:shadow-xl' : 'border-surface-dim bg-surface/30 normal-case'
                    }`}
                  />
                </div>
              </div>

              {isEditing && (
                <button 
                  onClick={handleSave}
                  className="w-full py-6 bg-primary text-white rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-2xl hover:bg-primary/90 active:scale-[0.98] transition-all"
                >
                  Update Account
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'Payment Methods', icon: CreditCard, count: '3 Saved' },
            { label: 'Saved Addresses', icon: MapPin, count: '2 Saved' },
            { label: 'Help & Support', icon: Phone, count: 'Available 24/7' },
            { label: 'Logout', icon: LogOut, count: 'Rahul Sharma' }
          ].map((item) => (
            <button key={item.label} className="bg-white p-8 rounded-[2.5rem] border border-surface-dim flex items-center justify-between group hover:border-black transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#EEEAE1] rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <item.icon size={24} />
                </div>
                <div className="text-left">
                  <h5 className="text-sm font-black tracking-widest">{item.label.toUpperCase()}</h5>
                  <p className="text-[10px] font-bold text-on-surface/30 normal-case">{item.count}</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-on-surface/20 group-hover:text-primary transition-transform group-hover:translate-x-2" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedPlan, setSelectedPlan] = useState<string>('tiffin');
  const [selectedChefId, setSelectedChefId] = useState<string>('auntie-meera');
  const [selectedRegion, setSelectedRegion] = useState<string>('North Indian');
  const [history, setHistory] = useState<Screen[]>(['home']);

  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(x => x.id === item.id);
      if (existing) {
        return prev.map(x => x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      }
      return [...prev, item];
    });
  };

  const clearCart = () => setCart([]);

  const navigateTo = (s: Screen, id?: string) => {
    if (s === 'plan-menu' && id) setSelectedPlan(id);
    if (s === 'chef-profile' && id) setSelectedChefId(id);
    if (s === 'region-menu' && id) setSelectedRegion(id);
    
    setHistory([...history, s]);
    setScreen(s);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setScreen(newHistory[newHistory.length - 1]);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setScreen('home');
      setHistory(['home']);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans bg-surface selection:bg-primary-container selection:text-on-primary-container">
      <SiteHeader cartCount={cartCount} onCartClick={() => navigateTo('checkout')} onScreenClick={navigateTo} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {screen === 'home' && (
            <HomeScreen 
              onChefClick={(id) => navigateTo('chef-profile', id)} 
              onPlanClick={(id) => navigateTo('plan-menu', id)} 
              onRegionClick={(r) => navigateTo('region-menu', r)}
            />
          )}
          {screen === 'chef-profile' && <ChefProfile chefId={selectedChefId} onBack={goBack} onDishClick={() => navigateTo('item-detail')} onAddToCart={addToCart} />}
          {screen === 'item-detail' && <ItemDetail onBack={goBack} onChefClick={(id) => navigateTo('chef-profile', id)} onAddToCart={addToCart} />}
          {screen === 'plan-listing' && <PlanListingScreen onPlanClick={(id) => navigateTo('plan-menu', id)} />}
          {screen === 'plan-menu' && <PlanMenuScreen planId={selectedPlan} onBack={goBack} />}
          {screen === 'region-menu' && <RegionMenuScreen region={selectedRegion} onBack={goBack} onAddToCart={addToCart} />}
          {screen === 'orders' && <OrdersScreen />}
          {screen === 'checkout' && <CheckoutScreen cart={cart} setCart={setCart} onBack={goBack} onClearCart={clearCart} onOrderSuccess={() => navigateTo('orders')} />}
          
          {screen === 'profile' && <ProfileScreen onBack={goBack} />}
        </motion.div>
      </AnimatePresence>

      <SiteFooter onScreenClick={navigateTo} />
    </div>
  );
}
