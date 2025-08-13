
    // Mobile menu toggle
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    burger?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    // Animate cards when in view
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.animate([
            {transform:'translateY(12px)', opacity:.001},
            {transform:'translateY(0)', opacity:1}
          ], {duration:450, easing:'cubic-bezier(.2,.6,.2,1)', fill:'forwards'});
          io.unobserve(e.target);
        }
      })
    }, {threshold:.2});
    document.querySelectorAll('[data-animate]').forEach(el=>io.observe(el));

    // Hero speedometer needle idle animation
    const needle = document.getElementById('needle');
    if(needle){
      needle.animate([
        {transform:'rotate(0deg)', transformOrigin:'210px 190px'},
        {transform:'rotate(35deg)', transformOrigin:'210px 190px'},
        {transform:'rotate(5deg)', transformOrigin:'210px 190px'},
        {transform:'rotate(45deg)', transformOrigin:'210px 190px'}
      ], {duration:4000, iterations:Infinity, direction:'alternate', easing:'ease-in-out'});
    }

    // Dynamic express slots (simple demo logic)
    const slotsEl = document.getElementById('slots');
    const toast = document.getElementById('toast');
    const times = ['10:00 AM','12:00 PM','02:00 PM','04:00 PM','06:00 PM'];
    times.forEach(t=>{
      const b = document.createElement('button');
      b.className = 'btn';
      b.type = 'button';
      b.textContent = t;
      b.addEventListener('click', ()=>{
        toast.textContent = `Added ${t} slot to your booking.`;
        toast.classList.remove('hidden');
        setTimeout(()=>toast.classList.add('hidden'), 3000);
      });
      slotsEl.appendChild(b);
    });

    // Booking form handler
    const form = document.getElementById('bookingForm');
    form?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const summary = `Thanks, ${data.name}! We\n\nCar: ${data.brand} ${data.model}\nService: ${data.service}\nDate: ${data.date}`;
      alert(summary + "\n\nOur team will confirm on WhatsApp soon.");
      form.reset();
    });

    // Reviews gentle auto-scroll
    const reviews = document.getElementById('reviews');
    let dir = 1;
    setInterval(()=>{
      if(!reviews) return;
      if(reviews.scrollLeft + reviews.clientWidth >= reviews.scrollWidth - 2) dir = -1;
      if(reviews.scrollLeft <= 0) dir = 1;
      reviews.scrollBy({left: 1.4 * dir, behavior:'auto'});
    }, 20);

    // Year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Set min date (today) for booking
    const date = document.getElementById('date');
    if(date){
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth()+1).padStart(2,'0');
      const dd = String(today.getDate()).padStart(2,'0');
      date.min = `${yyyy}-${mm}-${dd}`;
    }