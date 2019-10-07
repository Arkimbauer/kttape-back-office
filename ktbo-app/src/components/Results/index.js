import React, {useEffect, useContext} from 'react'
import CartButton from '../CartButton'
import logic from '../../logic'
import Context from '../Context'

function Results({ searchResult }) {

    const {setCat} = useContext(Context)
    const {items} = useContext(Context)

    const{ message, articles, error } = searchResult

    useEffect(() => {
        setCat()
    },[items])

    return <>
        <section className="searchResultMainContenedor">
            <section className="searchResult">
            {error && <h4>{error}</h4>}
                <h4>{message}</h4>
                {articles && articles.map(item => {
                    const {ref, title, description, img, price, quantity, id} = item

/*                     console.log(items)

                    function isOnCart(){
                        if(items){
                            items.map(eachArticle => {
                                if(eachArticle.item.article.id === id) {
                                    return true
                                } else {
                                    return false
                                }
                            })
                        }
                    } */

                    return <ul key={id} className="searchResult__article" >
                        <li className="searchResult__article--param">Ref: {ref}</li>
                        <li className="searchResult__article--param">{title}</li>
                        <li className="searchResult__article--param">{description}</li>
                        <li className="searchResult__article--param"><img alt="" src={img}/></li>
                        <li className="searchResult__article--param">Price: {price} €</li>
                        <li className="searchResult__article--param">Stock: {quantity} uds</li>
                        {/* !isOnCart() &&  */logic.isUserLogged() && <CartButton articleId={id} stock={quantity}/>}
                    </ul>
                })}
            </section>
        </section>
    </>
}

export default Results