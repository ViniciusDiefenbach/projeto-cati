import { Dimensions, Image, Modal, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Close from '../Close'
import ReactNativeZoomableView from '@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView'
import { styles } from './styles'

const { width } = Dimensions.get('window')

export default function ScaledImage ({
  uri,
  style,
  widthScale = 1
}) {
  const [proportion, setProportion] = React.useState(0)
  const [modalVisible, setModalVisible] = React.useState(false)
  Image.getSize(uri, (width, height) => setProportion(height / width))

  return (
      <View>
        <Modal visible={modalVisible} style={styles.modal}>
          <View style={styles.modalContainer}>
            <Close
              onPress={() => setModalVisible(false)}
            />

            <ReactNativeZoomableView
              maxZoom={1.5}
              minZoom={0.5}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}
              onZoomAfter={this.logOutZoomState}
              style={styles.imageContainer}
            >
              <Image
                source={{ uri }}
                style={[
                  { height: proportion * width },
                  style
                ]}
              />
            </ReactNativeZoomableView>
          </View>

        </Modal>
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={{ uri }}
            style={[
              { height: proportion * width * widthScale },
              style
            ]}
          />
        </TouchableWithoutFeedback>
      </View>
  )
}
