import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import { setCartEmpty } from '../../state';


const Checkout = () => {

    const dispatch = useDispatch()
    //const setCartEmpty = useSelector((state) => state.cart.setCartEmpty)

    const RedLabel = styled(Typography)({
        color: 'red',
        marginBottom: '5px',
    });


    const form = useRef();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart.cart);
    const totalPrice = cart.reduce((total, item) => {
        return total + item.count * item.attributes.price;
    }, 0);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_4v4l04d', 'template_xvfqyh9', form.current, 'vgPu6tecunI5M74Cw')
            .then((result) => {
                console.log(result.text);
                navigate("/confirmation");
                dispatch(setCartEmpty({}))

            })
            .catch((error) => {
                console.log(error.text);
            });
    };


    return (
        <Box component="form" ref={form} sx={{ m: "90px auto", width: "100%", maxWidth: 400, height: "65vh" }} onSubmit={sendEmail}>
            <Box sx={{ marginBottom: 2 }}>

                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                    Order with payment on delivery
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                    We will contact you to confirm
                </Typography>
            </Box>
            <Box sx={{ p: 4, borderColor: 'gray.200', borderRadius: 4 }}>
                <TextField
                    label="name"
                    name="from_name"
                    required
                    fullWidth
                    sx={{ mb: 2 }}

                />

                <TextField
                    label="Phone"
                    name="from_phone"
                    required
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Address"
                    name="from_adresse"
                    required
                    fullWidth
                    multiline
                    rows={4}
                    sx={{ mb: 2 }}
                />

                {cart.map((item) => (
                    <TextField
                        label=""
                        name="name_prod"
                        fullWidth
                        sx={{ mb: 2, display: 'none' }}
                        defaultValue={item.attributes.name}
                    />
                ))}
                {cart.map((item) => (
                    <TextField
                        label=""
                        name="price_prod"
                        fullWidth
                        sx={{ mb: 2, display: 'none' }}
                        value={item.attributes.price}
                    />
                ))}
                {cart.map((item) => (
                    <TextField
                        label=""
                        name="count_prod"
                        fullWidth
                        sx={{ mb: 2, display: 'none' }}
                        value={item.count}
                    />
                ))}
                <TextField
                    label={
                        <React.Fragment>
                            Total Price : {totalPrice}
                            <span style={{ display: 'inline-block', marginLeft: '5px' }}>
                                <RedLabel>+ 7$ frais livraison</RedLabel>
                            </span>
                        </React.Fragment>
                    }
                    name="total_price"
                    fullWidth
                    sx={{ mb: 2 }}
                    value={`${totalPrice + 7}$`}
                />
                <Button type="submit" value="Send" fullWidth sx={{ mt: 1, backgroundColor: 'primary.main', color: 'white' }}>

                    CHECKOUT
                </Button>

            </Box>
        </Box>
    );
};

export default Checkout;