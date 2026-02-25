import styles from "./Treatment.module.css";

interface TreatmentItem {
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  priceLabel?: string;
}

const treatments: TreatmentItem[] = [
  {
    id: "wrinkle-relaxers",
    image: "/images/treatment-wrinkle-relaxers.jpg",
    name: "Wrinkle Relaxers",
    description: "Unlimited Tox. One Price",
    price: "$50",
    priceLabel: "starting at",
  },
  {
    id: "microneedling",
    image: "/images/treatment-microneedling.jpg",
    name: "Microneedling",
    description: "Wrinkle reduction and improved texture",
    price: "$349",
  },
  {
    id: "agebeam",
    image: "/images/treatment-agebeam.jpg",
    name: "AgeBEAM",
    description: "Powerful wrinkle and pigmentation reduction. some downtime",
    price: "$1600",
  },
];

export const Treatment: React.FC = () => {
  return (
    <section className={styles.treatment}>
      <h2 className={styles.title}>Choose a treatment</h2>
      <div className={styles.list}>
        {treatments.map((item) => (
          <a key={item.id} href="#" className={styles.item}>
            <div className={styles.thumbnail}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.thumbnailImg}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.text}>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.description}>{item.description}</span>
              </div>
              <div className={styles.pricing}>
                {item.priceLabel && (
                  <span className={styles.priceLabel}>{item.priceLabel}</span>
                )}
                <span className={styles.price}>{item.price}</span>
              </div>
              <svg
                className={styles.arrow}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6L15 12L9 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
