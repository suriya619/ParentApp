import "intl";
import "intl/locale-data/jsonp/en";
import React from "react";
import { FlatList } from "react-native";
import CareEntriesItem from "./CareEntriesItem";

export default function CareEntries({ entries }) {
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 150 }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      data={entries}
      renderItem={({ item, index, length }) => (
        <CareEntriesItem item={item} index={index} length={entries.length} />
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}
