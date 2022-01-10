class StarRater extends HTMLElement {
    constructor() {
        super();

        this.build();
    }

    build() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.styles());

        const rater = this.createRater();
        this.stars = this.createStar();

        this.stars.forEach(star => rater.appendChild(star));

        this.resetRating();

        shadow.appendChild(rater);
    }

    createRater() { 
        const rater = document.createElement('div');
        rater.classList.add('star-rater');
        return rater;
    }

    createStar() {
        const createStar = (_, id) => {
            const star = document.createElement('span');
            star.classList.add('star');
            star.dataset.value = Number(id) + 1;
            star.innerHTML = '&#9733;'

            star.addEventListener('click', this.setRating.bind(this));
            star.addEventListener('mouseover', this.ratingHover.bind(this));
            star.addEventListener('mouseleave', this.resetRating.bind(this));

            return star;
        };

        return Array.from({length: 5}, createStar); // Map
    }

    setRating(event) {
        this.dataset.rating = event.target.getAttribute('data-value');
    }
    
    ratingHover(event) { 
        this.currentRatingValue = event.target.getAttribute('data-value');
        this.highlightRating();
    }

    highlightRating() {
        this.stars.forEach(star => {
            star.style.color = this.currentRatingValue >= star.getAttribute('data-value') ? 'yellow' : 'gray';
        })
    }

    resetRating() { 
        this.currentRatingValue = this.getAttribute('data-rating') || 0;
        this.highlightRating(); 
    }

    styles() {
        const style = document.createElement('style');
        style.textContent = `
          .star {
            font-size: 5rem;
            color: gray;
            cursor: pointer;
          }
        `;

        return style;
    }
}

customElements.define('star-rater', StarRater);

