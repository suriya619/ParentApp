import React from "react"; 
import { Button, Modal, Text, ScrollView } from "native-base"
type iRNAlert = {
  isOpen: boolean;
  onClose: any;
  title: string;
  description: string;
}
const RNAlert = ({isOpen, onClose, title, description}:iRNAlert) => {
  
  return <Modal isOpen={isOpen} onClose={onClose} size='md'>
  <Modal.Content >
    <Modal.CloseButton />
    <Modal.Header _text={{ color: 'primary.600' }} >{title}</Modal.Header>
    <Modal.Body>
      <ScrollView bounces={false}>
        <Text fontSize={'12'} fontWeight='semibold'>{description}</Text>
      </ScrollView>
    </Modal.Body>
    <Modal.Footer style={{flexDirection: "row", justifyContent: "space-between"}}>
      <Button w={'full'} _text={{ fontWeight: 'bold' }} onPress={onClose} >
          OK
        </Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
}
export default RNAlert;