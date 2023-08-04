/*
 * Copyright 2023 Red Hat, Inc. and/or its affiliates
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

package com.redhat.exhort.model;

import java.util.Comparator;

import com.redhat.exhort.api.DependencyReport;
import com.redhat.exhort.api.Issue;
import com.redhat.exhort.api.TransitiveDependencyReport;

public interface CvssScoreComparable {

  Issue getHighestVulnerability();

  public static class DependencyScoreComparator implements Comparator<DependencyReport> {

    @Override
    public int compare(DependencyReport d1, DependencyReport d2) {
      if (d1.getHighestVulnerability() == null && d2.getHighestVulnerability() == null) {
        return 0;
      }
      if (d1.getHighestVulnerability() != null && d2.getHighestVulnerability() == null) {
        return -1;
      }
      if (d1.getHighestVulnerability() == null && d2.getHighestVulnerability() != null) {
        return 1;
      }
      return Float.compare(
          d2.getHighestVulnerability().getCvssScore(), d1.getHighestVulnerability().getCvssScore());
    }
  }

  public static class TransitiveScoreComparator implements Comparator<TransitiveDependencyReport> {

    @Override
    public int compare(TransitiveDependencyReport d1, TransitiveDependencyReport d2) {
      if (d1.getHighestVulnerability() == null && d2.getHighestVulnerability() == null) {
        return 0;
      }
      if (d1.getHighestVulnerability() != null && d2.getHighestVulnerability() == null) {
        return -1;
      }
      if (d1.getHighestVulnerability() == null && d2.getHighestVulnerability() != null) {
        return 1;
      }
      return Float.compare(
          d2.getHighestVulnerability().getCvssScore(), d1.getHighestVulnerability().getCvssScore());
    }
  }
}
