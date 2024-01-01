/*
 * Copyright 2024 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.redhat.exhort.integration.backend;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.charset.StandardCharsets;
import java.time.*;
import java.util.Arrays;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ArrayUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BackendUtilsTest {

  private BackendUtils backendUtils;

  @BeforeEach
  void setUp() {
    this.backendUtils = new BackendUtils();
  }

  @Test
  void checkGeneratedWithLengthOf64AndHexaDecimalString() {

    String requestId = this.backendUtils.generateRequestId(UUID.randomUUID().toString());
    assertTrue(requestId.length() == 64);
    assertTrue(allCharactersAreHexaDecimalDigits(requestId));
  }

  private boolean allCharactersAreHexaDecimalDigits(String requestId) {

    return Arrays.stream(ArrayUtils.toObject(requestId.getBytes(StandardCharsets.UTF_8)))
            .filter(
                t -> // character is hexadecimal digit a-f
                    (t.shortValue() >= 97 && t.shortValue() <= 102)
                            // or char is one of 0-9 digits.
                        || (t.shortValue() >= 48 && (t.shortValue() <= 57)))
            .collect(Collectors.toList())
            .size()
        == requestId.length();
  }

  @Test
  void checkGeneratedWithNoRHDATokenAndShouldBeDifferentFromEachOther() {

    String reqId1 = this.backendUtils.generateRequestId(null);
    String reqId2 = this.backendUtils.generateRequestId(null);
    assertFalse(reqId1.equals(reqId2));
  }

  @Test
  void checkGeneratedWithSameUuidRHDATokenAndDifferentTimeShouldBeDifferentFromEachOther() {

    String randsomUUID = UUID.randomUUID().toString();
    String reqId1 = this.backendUtils.generateRequestId(randsomUUID);
    String reqId2 = this.backendUtils.generateRequestId(randsomUUID);
    assertFalse(reqId1.equals(reqId2));
  }

  @Test
  void checkGeneratedWithSameTimeDifferentRHDATokenAndDifferentFromEachOther() {

    String randomUUID = UUID.randomUUID().toString();
    String randomUUID2 = UUID.randomUUID().toString();
    AtomicReference<String> reqId = new AtomicReference();
    AtomicReference<String> reqId2 = new AtomicReference();
    LocalDate fakeDate = LocalDate.of(2024, 1, 1);
    Clock clock =
        Clock.fixed(fakeDate.atStartOfDay().toInstant(ZoneOffset.UTC), ZoneId.systemDefault());
    this.backendUtils.setClock(clock);
    Thread thread = new Thread(() -> reqId.set(this.backendUtils.generateRequestId(randomUUID)));
    Thread thread2 = new Thread(() -> reqId2.set(this.backendUtils.generateRequestId(randomUUID2)));
    thread.start();
    thread2.start();

    try {
      thread.join();
      thread2.join();
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      this.backendUtils.setClock(null);
    }
    assertFalse(reqId.get().equals(reqId2.get()));
  }

  @Test
  void checkGeneratedWithSameTimeSameRHDATokenAndTheyShouldBeEquals() {

    String randomUUID = UUID.randomUUID().toString();

    AtomicReference<String> reqId = new AtomicReference();
    AtomicReference<String> reqId2 = new AtomicReference();
    LocalDate fakeDate = LocalDate.of(2024, 1, 1);
    Clock clock =
        Clock.fixed(fakeDate.atStartOfDay().toInstant(ZoneOffset.UTC), ZoneId.systemDefault());
    this.backendUtils.setClock(clock);
    Thread thread = new Thread(() -> reqId.set(this.backendUtils.generateRequestId(randomUUID)));
    Thread thread2 = new Thread(() -> reqId2.set(this.backendUtils.generateRequestId(randomUUID)));
    thread.start();
    thread2.start();
    try {
      thread.join();
      thread2.join();
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      this.backendUtils.setClock(null);
    }

    assertTrue(reqId.get().equals(reqId2.get()));
  }

  @Test
  void checkGeneratedWithSameTimeWithNullRHDATokenAndTheyShouldBeDifferent() {

    String randomUUID = UUID.randomUUID().toString();

    AtomicReference<String> reqId = new AtomicReference();
    AtomicReference<String> reqId2 = new AtomicReference();
    LocalDate fakeDate = LocalDate.of(2024, 1, 1);
    Clock clock =
        Clock.fixed(fakeDate.atStartOfDay().toInstant(ZoneOffset.UTC), ZoneId.systemDefault());
    this.backendUtils.setClock(clock);
    Thread thread = new Thread(() -> reqId.set(this.backendUtils.generateRequestId(null)));
    Thread thread2 = new Thread(() -> reqId2.set(this.backendUtils.generateRequestId(null)));
    thread.start();
    thread2.start();
    try {
      thread.join();
      thread2.join();
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    } finally {
      this.backendUtils.setClock(null);
    }

    assertNotEquals(reqId.get(), reqId2.get());
  }
}
