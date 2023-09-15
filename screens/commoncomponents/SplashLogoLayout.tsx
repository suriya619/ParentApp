import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Box, Center, Heading, Modal, Radio, VStack } from "native-base";
import Logo from "../../assets/icons/Logo";
import config from "../../config";
import { getCompanyorService } from "../../store/auth/actions";
import { save, get } from "../../assets/styles/storage";


export default function SplashLogoLayout(props: any) {
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [activeEnvironment, setActiveEnvironment] = useState<any>(null);
  const dispatch  = useDispatch();
  const { status, type } = useSelector((state: any) => state.global.showInternetMessageModal);
  
  const toggleEnvModal = () => {
    setClickCount(clickCount + 1);
  }
  const handleEnvironmentSelection = async (value: any) => {
    await save('environment', value);
    await save('CompanyorService', null);
    setActiveEnvironment(value);
  };

  const fetchCompanyOrService = async (env: any) => {
    const baseUrl: any = config[env || config.default];
    dispatch(getCompanyorService(baseUrl));
  }

  useEffect(() => {
    if (clickCount >= 5) {
      retriveEnvironment();
      setShowModal(true)
      setClickCount(0);
    }
  }, [clickCount]);

  useEffect(() => {
    if (!status && type && type === "splash"){
      if (activeEnvironment) fetchCompanyOrService(activeEnvironment);
    }
  }, [status, type]);

  useEffect(() => {
    if (activeEnvironment) {
      fetchCompanyOrService(activeEnvironment);
    }
  }, [activeEnvironment])

  const retriveEnvironment = async () => {
    const environment = await get('environment');
    setActiveEnvironment(environment || config.default);
  }
  useEffect(() => {
    setTimeout(() => {
      retriveEnvironment();
    }, 2000);
  }, [])
  return (
    <Center w="100%" flex={1}>
      <Box
        maxW="500"
        w="100%"
        px={{
          base: "4",
          md: "20",
        }}
        py={{
          base: "8",
          md: "32",
        }}
        rounded={{ md: "xl" }}
        bg={{ md: "primary.800" }}
      >
        <Box
          mb={{
            base: "10",
            md: "16",
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Logo size="300px" />
          <Heading color="secondary.600" size="2xl">
            Your Child's Day
          </Heading>
          <TouchableOpacity onPress={toggleEnvModal} activeOpacity={1} style={{ height: 80, width: "100%", position: "absolute", bottom: -80 }} />
        </Box>
      </Box>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header _text={{ color: 'primary.600' }} >Environment Selection</Modal.Header>
          <Modal.Body>
            <Radio.Group
              name="environment"
              accessibilityLabel="environment"
              onChange={handleEnvironmentSelection}
              value={activeEnvironment}
            >
              <VStack space="2">
                <Radio value="dev">DEV</Radio>
                {/* <Radio value="uat">UAT</Radio> */}
                <Radio value="demo">DEMO</Radio>
                <Radio value="uatv1">UATV1</Radio>
                <Radio value="production">PRODUCTION</Radio>
              </VStack>
            </Radio.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
