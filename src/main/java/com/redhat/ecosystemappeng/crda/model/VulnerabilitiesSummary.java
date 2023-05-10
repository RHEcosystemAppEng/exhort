package com.redhat.ecosystemappeng.crda.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record VulnerabilitiesSummary(int total, int direct, int critical, int high, int medium, int low) {
    
    public static class Builder {
        
        int total;
        int direct;
        int critical;
        int high;
        int medium;
        int low;

        public Builder total(int total) {
            this.total = total;
            return this;
        }

        public Builder direct(int direct) {
            this.direct = direct;
            return this;
        }
        public Builder critical(int critical) {
            this.critical = critical;
            return this;
        }
        public Builder high(int high) {
            this.high = high;
            return this;
        }
        public Builder medium(int medium) {
            this.medium = medium;
            return this;
        }
        public Builder low(int low) {
            this.low = low;
            return this;
        }

        public VulnerabilitiesSummary build() {
            return new VulnerabilitiesSummary(total, direct, critical, high, medium, low);
        }
    }
}
