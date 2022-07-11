import { useContext, useEffect } from 'react';
import ScrollContainer from './ScrollContainer';
import { getGameData } from './gameData';

function Item({data}) {
    const { id, name, title, type, texto, url, img } = data;
    return (
        <div className="w-1/4 mb-5">
            <p className='text-center mb-3'>{title}</p>
            <img src={img} className="w-full" />
        </div>
    )
}

function AvatarView() {
    const demoData = getGameData();
    const filter = demoData.nodes.filter(n => n.category && n.id.indexOf('4') === -1)
    return (
        <ScrollContainer style={{height: 'calc(100vh - 120px)'}}>
            <div className='w-full flex flex-wrap py-5'>
                {
                    filter.map(n => <Item data={n}/>)
                }
            </div>
        </ScrollContainer>
    )
}

export default AvatarView