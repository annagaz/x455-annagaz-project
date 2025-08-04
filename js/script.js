$(document).ready(function() {

    // --- Hamburger Menu Toggle ---
    $('.hamburger-menu').on('click', function() {
        $('.nav-links').toggleClass('active');
    });

    // --- Image Carousel (Explore Page) ---
    let slideIndex = 0;
    const slides = $('.carousel-slide');
    const dots = $('.carousel-dot');

    function showSlide(n) {
        slides.hide();
        dots.removeClass('active');
        slides.eq(n).show();
        dots.eq(n).addClass('active');
    }

    function currentSlide(n) {
        showSlide(slideIndex = n);
    }

    if (slides.length > 0) { // Only run if carousel exists on the page
        showSlide(slideIndex);

        dots.each(function(index) {
            $(this).on('click', function() {
                currentSlide(index);
            });
        });
    }

    // --- Sortable Table (All Coffees Page) ---
    $('.sortable-table th').on('click', function() {
        const table = $(this).parents('table').eq(0);
        const rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
        this.asc = !this.asc;
        if (!this.asc) {
            rows = rows.reverse();
        }
        for (let i = 0; i < rows.length; i++) {
            table.append(rows[i]);
        }
        // Update sort icons
        // Reset all icons to default (up arrow)
        $('.sortable-table th .sort-icon').html('&#9650;'); // Default to up arrow for all
        $(this).append('<span class="sort-icon">' + (this.asc ? ' &#9650;' : ' &#9660;') + '</span>');
        // Update the clicked header's icon
        $(this).find('.sort-icon').html(this.asc ? '&#9650;' : '&#9660;');
    });

    function comparer(index) {
        return function(a, b) {
            let valA = getCellValue(a, index),
                valB = getCellValue(b, index);
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
        };
    }

    function getCellValue(row, index) {
        return $(row).children('td').eq(index).text();
    }

    // --- Accordion (Farms Page) ---
    $('.accordion').on('click', function() {
        this.classList.toggle('active');
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    });

    // --- Lightbox/Modal (Stories Page) ---
    $('.thumbnail-item').on('click', function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgAlt = $(this).find('h4').text();

        $('body').append(`
            <div class="lightbox-modal">
                <span class="close-modal">&times;</span>
                <img class="lightbox-content" src="${imgSrc}" alt="${imgAlt}">
                <div class="lightbox-caption">${imgAlt}</div>
            </div>
        `);
        $('.lightbox-modal').fadeIn();
    });

    // Close the lightbox when clicking on the close button or outside the image
    $(document).on('click', '.close-modal, .lightbox-modal', function(event) {
        if ($(event.target).hasClass('lightbox-modal') || $(event.target).hasClass('close-modal')) {
            $('.lightbox-modal').fadeOut(function() {
                $(this).remove();
            });
        }
    });
});