//import logo from './logo.svg';
import './App.css';
import * as React from 'react'
import  Home from './components/home.js'
import { sequence } from '0xsequence'
import { ethers } from 'ethers'
import { ETHAuth, Proof } from '@0xsequence/ethauth'
// import { ERC_20_ABI } from './constants/abi'
import { configureLogger } from '@0xsequence/utils'

import { Grid, GridItem } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'



const App = () => {
    const network = 'mumbai'
    const wallet = new sequence.Wallet(network)

    const connect = async (authorize: boolean = false) => { 
        const connectDetails = await wallet.connect({
            app: 'Treebler',
            authorize
        })

        console.warn('connectDetails', { connectDetails })

        if (authorize) {
            const ethAuth = new ETHAuth()

            if (connectDetails.proof) {
                const decodedProof = await ethAuth.decodeProof(connectDetails.proof.proofString, true)
                console.warn({ decodedProof })

                const isValid = await wallet.utils.isValidTypedDataSignature(
                    await wallet.getAddress(),
                    connectDetails.proof.typedData,
                    decodedProof.signature,
                    await wallet.getAuthChainId()
                )
                console.log('isValid?', isValid)
                if (!isValid) throw new Error('sig invalid')
            }
        }
    }

    return (
        <div className="theApp">
        <Grid 
        h='25vh'
        w='100vw'
        templateColumns='repeat(4, 1fr)'
        templateRows='repeat(2, 1fr)'
        p={10}
        gap={4}
        >
        <GridItem borderRadius='lg' as='button'
        rowSpan={2} colSpan={2} bg='purple.200' _hover={{background: "purple"}}
        align='center' fontSize='5vh' pt='1vh'>
        <Link href="./home.js" style={{textDecoration: 'none'}}>[Treebler]</Link>
        </GridItem>

        <GridItem colSpan={1} />

        <GridItem as='button' borderRadius='lg' _hover={{background: "purple"}}
        onClick={() => connect()}
        rowSpan={1} colSpan={1} bg='purple.200' align='center' fontsize='3vh' pt='0.5vh'>
        Connect Wallet 
        </GridItem>
        </Grid>

        <Grid h='75vh' w='100vw' p={10} gap={4}
           templateColumns='repeat(2, 1fs)'
            templateRows='repeat(4, 1fs)'
        >
        <GridItem borderRadius='lg' bg='purple.200' rowSpan={3} colSpan={2} p={4}
        fontSize='5vh' fontStyle='bold' align='center' pt='6vh'>
            Your organization’s road to Web3. Manage ETH donations and explore unique fundraising opportunities as part of a transparent, future-forward giving community.
        </GridItem>
        <GridItem colSpan={1} />
        <GridItem as='button' _hover={{background: "red"}}
        borderRadius='lg' bg='red.200' rowSpan={1} colSpan={1} p={4}
        textAlign='center' pt='1vh' fontSize='3vh'
        >
            Begin Your Journey
        </GridItem>
        </Grid>
        </div>
    )

}

export default App;
