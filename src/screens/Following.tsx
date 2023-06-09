import React from "react"
import { Modal, View } from "react-native"
import { Button, Divider, Icon, Text } from "@ui-kitten/components"
import * as Haptics from "expo-haptics"

import { useFeed } from "store/hooks"
import { Layout, Note, NoteCreate, TopNavigation, Spinner, FlashList } from "components"
import { usePrevious } from "utils/usePrevious"
import HomeVideoScroller from "../components/HomeVideoScroller"

import { useNote, useProfile } from "store/hooks"
//
// Following feed is populated in NostrRelayHandler
//
export function FollowingScreen() {
  const [creatingNote, setCreatingNote] = React.useState(false)
  const { loading, notes } = useFeed("following")
  const prevLoading = usePrevious(loading)
  const noNotesLoaded = prevLoading && !loading && notes.length === 0

  // const note = useNote(notes)
  const renderNote = React.useCallback(({ item }) => <Note key={item} id={item} />, [])
  const keyExtractor = React.useCallback((item: unknown) => item, [])
  // const renderVideo = React.useCallback(({ item }) => <Feed key={item} id={item} />, [])

  return (
    <Layout>
      <TopNavigation alignment="center" showLogo />
      <Divider />
      <View style={{ position: "relative", flex: 1 }}>
        {loading && <Spinner />}

        {notes?.length > 0 && <FlashList data={notes} renderItem={renderNote} keyExtractor={keyExtractor} />}
        {/* {notes?.length > 0 && <HomeVideoScroller data={notes}/>} */}
        
        {noNotesLoaded && (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>No notes loaded</Text>
          </View>
        )}

        <Button
          onPress={() => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
            setCreatingNote(true)
          }}
          style={{
            position: "absolute",
            bottom: 16,
            right: 16,
            height: 50,
            width: 50,
            borderRadius: 50 / 2,
          }}
          accessoryLeft={({ style }: { style: object }) => {
            return (
              <Icon
                name="plus-outline"
                style={{
                  ...style,
                }}
              />
            )
          }}
        />

        {creatingNote && (
          <Modal
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={() => {
              setCreatingNote(false)
            }}
          >
            <NoteCreate closeModal={() => setCreatingNote(false)} />
          </Modal>
        )}
      </View>
    </Layout>
  )
}
