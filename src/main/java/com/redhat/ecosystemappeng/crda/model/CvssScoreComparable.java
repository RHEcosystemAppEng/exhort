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

package com.redhat.ecosystemappeng.crda.model;

import java.util.Comparator;

public interface CvssScoreComparable {

    Issue highestVulnerability();

    public static class CvssScoreComparator implements Comparator<CvssScoreComparable> {

        @Override
        public int compare(CvssScoreComparable d1, CvssScoreComparable d2) {
            if (d1.highestVulnerability() == null && d2.highestVulnerability() == null) {
                return 0;
            }
            if (d1.highestVulnerability() != null && d2.highestVulnerability() == null) {
                return 1;
            }
            if (d1.highestVulnerability() == null && d2.highestVulnerability() != null) {
                return -1;
            }
            return Float.compare(
                    d1.highestVulnerability().cvssScore(), d2.highestVulnerability().cvssScore());
        }
    }
}
