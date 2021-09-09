import React from 'react';
import {
    View,
    Text
} from 'react-native';

import {FONTS, SIZES, COLORS} from '../../constants';
import {TextButton} from '../../components';
import { AuthLayout} from '../';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Otp = ({navigation}) => {

    const [timer,setTimer] = React.useState(60)

    React.useEffect(() => {
        let interval = setInterval(() => {
            setTimer(prevTimer => {
                if(prevTimer > 0){
                    return prevTimer - 1;
                }else{
                    return prevTimer;
                }
            })
        },1000) 

        return () => clearInterval(interval);
    }, [])

    return (
        <AuthLayout
            title="OTP Authentication"
            subtitle="An authentication code has been sent to your email"
            titleContainerStyle={{
                marginTop:SIZES.padding*2
            }}
        >
            {/*OTP inputs */}
            <View
                style={{
                    flex:1,
                    marginTop:SIZES.padding*2
                }}
            >
                <OTPInputView 
                    pinCount={4} 
                    style={{
                        width:'100%',
                        height:50
                    }}
                    codeInputFieldStyle={{
                        width:65,
                        height:65,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.lightGray2,
                        color:COLORS.black,
                        ...FONTS.h3
                    }}
                    onCodeFilled = {(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                />

                {/*Countdown Timer */}
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        marginTop:SIZES.padding,
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        Didn't receive code ?
                    </Text>
                    <TextButton 
                        label={`Resend (${timer}s)`}
                        disabled={timer == 0 ? false :true}
                        buttonContainerStyle={{
                            marginTop:SIZES.base,
                            backgroundColor:null,
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.h3
                        }}
                        onPress={() => setTimer(60)}
                    />
                </View>
            </View>
            {/*Footer */}
            <View>
                <TextButton 
                    label="Continue"
                    buttonContainerStyle={{
                        height:50,
                        alignItems:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    onPress={() => navigation.navigate("SignIn")}
                />

                <View
                    style={{
                        marginTop:SIZES.padding,
                        alignItems:'center'
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.darkGray,
                            ...FONTS.body3
                        }}
                    >
                        By signing up, you agree to our
                    </Text>
                    <TextButton 
                        label="Term and Conditions"
                        buttonContainerStyle={{
                            backgroundColor:null
                        }}
                        labelStyle={{
                            color:COLORS.primary,
                            ...FONTS.body3
                        }}
                        onPress={() =>console.log("Tnc")}
                    />
                </View>
            </View>
        </AuthLayout>
    )
}

export default Otp;