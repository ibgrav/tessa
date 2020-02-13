import { linkResolver } from './prismic';
import { RichText } from 'prismic-reactjs';
import Link from 'next/link';

const Cards = ({ items }) => {
  return (
    <div className="card-gallery">
      {items.length && items.map((card, index) => {
        const { title, card_image } = card.data;
        return <div key={index} className="card" style={{ backgroundImage: `url(${card_image && card_image.url})` }}>
          <Link href={linkResolver(card)}><a className="cover"><span className="card-title">{RichText.render(title)}</span></a></Link>
        </div>
      })}
    </div>
  )
}

export default Cards;