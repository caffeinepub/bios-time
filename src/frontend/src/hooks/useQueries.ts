import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { UserProfile, Alert, DreamJournalEntry, Ritual, Settings } from '../backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) {
        return null;
      }
      try {
        const profile = await actor.getCallerUserProfile();
        return profile;
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        // Return null instead of throwing for unauthorized/guest users
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
    // Prevent throwing errors to error boundary
    throwOnError: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && !actorFetching && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.saveCallerUserProfile(profile);
      } catch (error) {
        console.error('Failed to save user profile:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAlerts() {
  const { actor, isFetching } = useActor();

  return useQuery<Alert[]>({
    queryKey: ['alerts'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getAlerts();
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    throwOnError: false,
  });
}

export function useGetDreams() {
  const { actor, isFetching } = useActor();

  return useQuery<DreamJournalEntry[]>({
    queryKey: ['dreams'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getDreams();
      } catch (error) {
        console.error('Failed to fetch dreams:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    throwOnError: false,
  });
}

export function useGetRituals() {
  const { actor, isFetching } = useActor();

  return useQuery<Ritual[]>({
    queryKey: ['rituals'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getRituals();
      } catch (error) {
        console.error('Failed to fetch rituals:', error);
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    throwOnError: false,
  });
}

export function useGetSettings() {
  const { actor, isFetching } = useActor();

  return useQuery<Settings | null>({
    queryKey: ['settings'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getSettings();
      } catch (error) {
        console.error('Failed to fetch settings:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching,
    throwOnError: false,
  });
}

export function useUpdateSettings() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Settings) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.updateSettings(settings);
      } catch (error) {
        console.error('Failed to update settings:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
}

export function useAddDreamEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (entry: DreamJournalEntry) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.addDreamEntry(entry);
      } catch (error) {
        console.error('Failed to add dream entry:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dreams'] });
    },
  });
}

export function useAddRitual() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ritual: Ritual) => {
      if (!actor) throw new Error('Actor not available');
      try {
        return await actor.addRitual(ritual);
      } catch (error) {
        console.error('Failed to add ritual:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rituals'] });
    },
  });
}
