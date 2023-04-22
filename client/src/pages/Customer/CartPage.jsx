import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ProductItem } from '../../components/ProductItem';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 30vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const productData = [
  {
    id: 1,
    thumbNail:
      'https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/gumac3/dc08097/2-den-dc08097.jpg',
    title: 'Product 1',
    size: 20,
    color: 'red',
    quantity: 10,
    price: 100,
  },
  {
    id: 2,
    thumbNail:
      'https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/gumac/DC09062/2-CAM-DC09062.jpg',
    title: 'Product 2',
    size: 24,
    color: 'blue',
    quantity: 30,
    price: 150,
  },
];
const CartPage = () => {
  const navigate = useNavigate();
  const cart = { total: 100 };
  return (
    <Container style={{ marginTop: 180 }}>
      <Wrapper>
        <Title style={{ fontSize: 30, fontWeight: 'bold' }}>
          ĐƠN HÀNG CỦA TÔI
        </Title>
        <Top style={{ width: '80%', margin: '20px auto' }}>
          <TopButton onClick={() => navigate('/product')}>
            CONTINUE SHOPPING
          </TopButton>
          <TopButton type="filled" onClick={() => navigate('/payment')}>
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom style={{ width: '80%', margin: '20px auto' }}>
          <Info>
            {productData.map((product) => (
              <ProductItem
                id={product.id}
                thumbNail={product.thumbNail}
                title={product.title}
                size={product.size}
                color={product.color}
                quantity={product.quantity}
                price={product.price}
              />
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default CartPage;
