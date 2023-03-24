import { Breadcrumb, SimpleCard } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { editElectronics } from './store/Electronics.action'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'components/Typography'
import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const EditElectronics = () => {
    const { id: ElectronicsId } = useParams()

    const Electronics = useSelector((state) =>
        state.Electronics.entities.find(
            (Electronics) =>
                Electronics.id.toString() === ElectronicsId.toString()
        )
    )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productname, setProductname] = useState(Electronics.productname)
    const [description, setDescription] = useState(Electronics.description)
    const [offer, setOffer] = useState(Electronics.offer)
    const [price, setPrice] = useState(Electronics.price)
    const [deliverydate, setDeliverydate] = useState(Electronics.deliverydate)

    const handleProductname = (e) => setProductname(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleOffer = (e) => setOffer(e.target.value)
    const handlePrice = (e) => setPrice(parseInt(e.target.value))
    const handleDeliverydate = (e) => setDeliverydate(parseInt(e.target.value))

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            editElectronics({
                id: ElectronicsId,
                productname,
                description,
                offer,
                price,
                deliverydate,
            })
        )
        navigate('/Electronics')
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'EditElectronics', path: '/Electronics' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="Productname"
                                id="productnameInput"
                                onChange={handleProductname}
                                value={productname}
                                validators={['required']}
                                label="Productname"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="Description"
                                id="descriptionInput"
                                onChange={handleDescription}
                                value={description}
                                validators={['required']}
                                label="Description"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                value={offer}
                                onChange={handleOffer}
                                select
                                id="offerInput"
                                label="Offer"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                <MenuItem value={true}>True</MenuItem>
                                <MenuItem value={false}>False</MenuItem>
                            </TextField>
                            <TextField
                                type="number"
                                name="Price"
                                id="priceInput"
                                onChange={handlePrice}
                                value={price || ''}
                                validators={['required']}
                                label="Price"
                                errorMessages={['this field is required']}
                            />
                            <TextField
                                type="number"
                                name="Deliverydate"
                                id="deliverydateInput"
                                onChange={handleDeliverydate}
                                value={deliverydate || ''}
                                validators={['required']}
                                label="Deliverydate"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Save
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default EditElectronics
