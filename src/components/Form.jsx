/* 데이터 처음 입력 컴포지션 */
export default function Form({ handleSubmit, value, setValue }) { 
    const handleChange = (e) => {
        console.log(e.target.value);
        setValue(e.target.value); // state의 value데이터에 들어가려면 setState 매소드 쓰면 된다.
    }

    return <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <input
            type='text'
            name='value'
            style={{ flex: '10', padding: '5px' }}
            placeholder='할 일을 입력하세요'
            value={value}
            onChange={handleChange}
        />
        <input
            type='submit'
            value='입력'
            className='btn'
            style={{ flex: '1' }}
        />
    </form>;
}